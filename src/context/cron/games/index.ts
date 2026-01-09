import { ScoresService } from "../../api/modules/scores/scores.service.js"
import { GamePlayerStatsService } from "../../api/modules/stats/gamePlayerStats/service.js"
import { GameTeamStatsService } from "../../api/modules/stats/gameTeamStats/service.js"
import { TeamsService } from "../../api/modules/teams/teams.service.js"
import { filterExistingScores, removeDuplicateScores, removeEmptyItems } from "../../scrap/helpers/arrays.js"
import { scrapGames } from "../../scrap/jsdom/games/index.js"
import { scrapScores } from "../../scrap/jsdom/score/index.js"
import type { Score } from "../../api/modules/scores/scores.types.js"
import type { ScrapScore } from "../../scrap/jsdom/score/types.js"
import type { GameTeamStats } from "../../api/modules/stats/gameTeamStats/types.js"
import type { GamePlayerStats } from "../../api/modules/stats/gamePlayerStats/types.js"

const teamsService = new TeamsService()
const scoresService = new ScoresService()
const gameTeamStatsService = new GameTeamStatsService()
const gamePlayerStatsService = new GamePlayerStatsService()

export const cronGames = async () => {
  // Coger todos los teamsIds
  const teamsIds = await teamsService.getAllIds()

  // Scrapear todos los scores y eliminar duplicados
  const scoresPromises: Promise<ScrapScore[]>[] = []
  teamsIds.forEach((id) => scoresPromises.push(scrapScores(id)))
  const scores = (await Promise.all(scoresPromises)).flat()
  const cleanedScores = removeDuplicateScores(scores)

  // Coger todos los scores
  const existingScoresIds = await scoresService.getAllIds()

  // Eliminar duplicados entre scores de supabase y los scrapeados
  const scoresFiltered = filterExistingScores(cleanedScores, existingScoresIds)
  const scoresFilteredIds = scoresFiltered.map((s) => s.gameFebId)

  // Scrapear los games de los scores filtrados
  const games = await scrapGames(scoresFilteredIds)

  // Guardar los nuevos
  const gamesMapped = games.filter(removeEmptyItems).map((g) => {
    const scrapedScore = scoresFiltered.find((s) => s.gameFebId === g.gameFebId) as ScrapScore

    const score: Score = {
      ...scrapedScore,
      localTeamFebId: g.local.teamFebId,
      localScore: g.local.scores.total,
      localQuarters: g.local.scores.quarters,
      awayTeamFebId: g.away.teamFebId,
      awayScore: g.away.scores.total,
      awayQuarters: g.away.scores.quarters,
    }

    const teamStats = [g.local.teamStats, g.away.teamStats]
    const playerStats = [g.local.playerStats, g.away.playerStats].flat()

    return { score, teamStats, playerStats }
  })

  const scoresToSave: Score[] = []
  const teamStatsToSave: GameTeamStats[] = []
  const playerStatsToSave: GamePlayerStats[] = []

  gamesMapped.forEach((g) => {
    scoresToSave.push(g.score)
    g.teamStats.forEach((s) => teamStatsToSave.push(s))
    g.playerStats.forEach((s) => playerStatsToSave.push(s))
  })

  return await Promise.all([
    scoresService.save(scoresToSave),
    gameTeamStatsService.save(teamStatsToSave),
    gamePlayerStatsService.save(playerStatsToSave),
  ])
}
