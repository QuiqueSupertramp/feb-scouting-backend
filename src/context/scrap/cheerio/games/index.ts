import { getDocument } from "../getDocument.js"
import { getScores } from "./getScores.js"
import { getPlayersStats } from "./getPlayersStats.js"
import { mapGamesPlayersStats, mapGamesTeamsStats } from "./mappers.js"
import { getTeamsStats } from "./getTeamsStats.js"
import { removeEmptyItems } from "../../helpers/arrays.js"
import type { GameScore } from "../../../api/modules/scores/scores.types.js"
import type { GamePlayerStats } from "../../../api/modules/stats/gamePlayerStats/types.js"
import type { GameTeamStats } from "../../../api/modules/stats/gameTeamStats/types.js"

export interface ScrapGame {
  gameFebId: string
  scores: GameScore
  playersStats: GamePlayerStats[]
  teamStats: GameTeamStats[]
}

const GAMES_BASE_URL = "https://baloncestoenvivo.feb.es/partido"

export const scrapGame = async (gameFebId: string) => {
  const url = `${GAMES_BASE_URL}/${gameFebId}`

  const $ = await getDocument(url)
  if (!$) return undefined

  const score = getScores($)

  const playersStats = getPlayersStats($)
  const [localPlayersStatsMapped, awayPlayersStatsMapped] = mapGamesPlayersStats({ gameFebId, playersStats, score })

  const teamsStats = getTeamsStats($)
  const [localTeamStatsMapped, awayTeamStatsMapped] = mapGamesTeamsStats({ gameFebId, teamsStats, score })

  return {
    gameFebId,
    scores: score,
    playersStats: [...localPlayersStatsMapped, ...awayPlayersStatsMapped],
    teamStats: [localTeamStatsMapped, awayTeamStatsMapped],
  } as ScrapGame
}

export const scrapGames = async (gameFebIds: string[]) => {
  const promises: Promise<ScrapGame | undefined>[] = []
  gameFebIds.filter(removeEmptyItems).forEach((id) => promises.push(scrapGame(id)))
  const games = (await Promise.all(promises)).filter((p) => p !== undefined)

  return {
    scores: games.map((g) => ({ gameFebId: g.gameFebId, ...g.scores })),
    playerStats: games.flatMap((g) => g.playersStats),
    teamStats: games.flatMap((g) => g.teamStats),
  }
}
