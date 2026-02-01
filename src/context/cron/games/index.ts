import { ScoresService } from "../../api/modules/scores/scores.service.js"
import { GamePlayerStatsService } from "../../api/modules/stats/gamePlayerStats/service.js"
import { GameTeamStatsService } from "../../api/modules/stats/gameTeamStats/service.js"
import { apiCache } from "../../../app/cache/lru.js"
import { scrapGames } from "../../scrap/cheerio/games/index.js"
import { getScoresToSave } from "./getScoresToSave.js"
import { logErrorBLock } from "../../../app/logger.js"
import type { ScrapScore } from "../../scrap/cheerio/score/index.js"

const scoresService = new ScoresService()
const gameTeamStatsService = new GameTeamStatsService()
const gamePlayerStatsService = new GamePlayerStatsService()

export const cronGames = async () => {
  const scores = await getScoresToSave()
  if (scores.length === 0) {
    return "No hay partidos para actualizar"
  }

  const scoresFilteredIds = scores.map((s) => s.gameFebId)
  const games = await scrapGames(scoresFilteredIds)

  const scoresToSave = games.scores.map((s) => {
    const score = scores.find((sf) => sf.gameFebId === s.gameFebId) as ScrapScore
    return {
      ...score,
      ...s,
    }
  })

  const res = await Promise.allSettled([
    scoresService.save(scoresToSave),
    gameTeamStatsService.save(games.teamStats),
    gamePlayerStatsService.save(games.playerStats),
  ])

  res[0].status === "fulfilled" && res[0].value === true
    ? console.log(`⭐ Se han actualizado ${scoresToSave.length} scores`)
    : logErrorBLock(["Error al actualizar scores"])
  res[1].status === "fulfilled" && res[1].value === true
    ? console.log(`⭐ Se han actualizado ${games.teamStats.length} gameTeamStats`)
    : logErrorBLock(["Error al actualizar gameTeamStats"])
  res[2].status === "fulfilled" && res[2].value === true
    ? console.log(`⭐ Se han actualizado ${games.playerStats.length} gamePlayerStats`)
    : logErrorBLock(["Error al actualizar gamePlayerStats"])

  apiCache.clear()
  console.log("🚀 Cache clared")

  return res
}
