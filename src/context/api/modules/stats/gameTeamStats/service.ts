import { database } from "../../../../../app/database/index.js"
import { ApiError } from "../../../../../app/errors/apiError.js"
import { getAverageGameTeamStats } from "./helpers/getAverageGameTeamStats.js"
import { mapGameTeamStatsFromSupabase, mapGameTeamStatsToSupabase } from "./mappers.js"
import type { GameTeamStats } from "./types.js"

export class GameTeamStatsService {
  save = async (teamStats: GameTeamStats[]) => {
    const { error } = await database.from("game_team_stats").upsert(teamStats.map(mapGameTeamStatsToSupabase))
    return !error
  }

  getByTeamId = async (teamFebId: string) => {
    const { data, error, status, statusText } = await database
      .from("game_team_stats")
      .select("*, scores(date)")
      .filter("team_feb_id", "eq", teamFebId)
    if (error || !data) throw new ApiError(status, statusText, error.code)

    const sorted = data?.sort((a, b) => {
      const dateA = a.scores?.date ? new Date(a.scores.date).getTime() : 0
      const dateB = b.scores?.date ? new Date(b.scores.date).getTime() : 0
      return dateB - dateA
    })

    const dataMapped = data.map(mapGameTeamStatsFromSupabase)
    const localGamesStats = dataMapped.filter((d) => d.local)
    const awayGamesStats = dataMapped.filter((d) => !d.local)
    const winGameStats = dataMapped.filter((d) => d.win)
    const lossGameStats = dataMapped.filter((d) => !d.win)
    const lastGames = sorted.slice(0, 4).map(mapGameTeamStatsFromSupabase)

    return {
      total: getAverageGameTeamStats(dataMapped).stats,
      local: getAverageGameTeamStats(localGamesStats).stats,
      away: getAverageGameTeamStats(awayGamesStats).stats,
      win: getAverageGameTeamStats(winGameStats).stats,
      loss: getAverageGameTeamStats(lossGameStats).stats,
      last: getAverageGameTeamStats(lastGames).stats,
    }
  }

  getLeagueStats = async () => {
    const { data, error, status, statusText } = await database.from("game_team_stats").select("*")
    if (error || !data) throw new ApiError(status, statusText, error.code)

    return getAverageGameTeamStats(data.map(mapGameTeamStatsFromSupabase)).stats
  }
}
