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
      .select("*")
      .filter("team_feb_id", "eq", teamFebId)
    if (error || !data) throw new ApiError(status, statusText, error.code)

    return getAverageGameTeamStats(data.map(mapGameTeamStatsFromSupabase))
  }
}
