import { ScoresService } from "../../api/modules/scores/scores.service.js"
import { GamePlayerStatsService } from "../../api/modules/stats/gamePlayerStats/service.js"
import { GameTeamStatsService } from "../../api/modules/stats/gameTeamStats/service.js"
import { apiCache } from "../../../app/cache/lru.js"
import { scrapGames } from "../../scrap/cheerio/games/index.js"
import { getScoresToSave } from "./getScoresToSave.js"
import { LOGGER } from "../../../app/logger.js"
import type { ScrapScore } from "../../scrap/cheerio/score/index.js"

const scoresService = new ScoresService()
const gameTeamStatsService = new GameTeamStatsService()
const gamePlayerStatsService = new GamePlayerStatsService()

export const cronGames = async () => {
  const scoresToSave = await getScoresToSave()
  if (scoresToSave.length === 0) {
    return "No hay partidos para actualizar"
  }

  const scoresToSaveIds = scoresToSave.map((s) => s.gameFebId)
  const { scores, playerStats, teamStats } = await scrapGames(scoresToSaveIds)

  const scoresToSaveFiltered = scores.map((s) => {
    const score = scoresToSave.find((sf) => sf.gameFebId === s.gameFebId) as ScrapScore
    return {
      ...score,
      ...s,
    }
  })

  const scoreRes = await scoresService.save(scoresToSaveFiltered)

  scoreRes === true
    ? LOGGER.success(`⭐ Se han actualizado ${scoresToSaveFiltered.length} scores`)
    : LOGGER.error("Error al actualizar scores")

  if (!scoreRes) return

  const [teamStatsRes, playerStatsRes] = await Promise.allSettled([
    gameTeamStatsService.save(teamStats),
    gamePlayerStatsService.save(playerStats),
  ])

  teamStatsRes.status === "fulfilled" && teamStatsRes.value === true
    ? LOGGER.success(`⭐ Se han actualizado ${teamStats.length} gameTeamStats`)
    : LOGGER.error("Error al actualizar gameTeamStats")
  playerStatsRes.status === "fulfilled" && playerStatsRes.value === true
    ? LOGGER.success(`⭐ Se han actualizado ${playerStats.length} gamePlayerStats`)
    : LOGGER.error("Error al actualizar gamePlayerStats")

  apiCache.clear()
  LOGGER.info("🚀 Cache clared")

  return { scores: true, teamStats: teamStatsRes, playerStats: playerStatsRes }
}
