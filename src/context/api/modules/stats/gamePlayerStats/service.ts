import { database } from "../../../../../app/database/index.js"
import { ApiError } from "../../../../../app/errors/apiError.js"
import { getAverageGamePlayerStats } from "./helpers/getAverageGamePlayerStats.js"
import { mapGamePlayerStatsFromSupabase, mapGamePlayerStatsToSupabase } from "./mappers.js"
import type { GamePlayerStats } from "./types.js"

export class GamePlayerStatsService {
  constructor() {}

  save = async (stats: GamePlayerStats[]) => {
    const { error } = await database.from("game_player_stats").upsert(stats.map(mapGamePlayerStatsToSupabase))
    return !error
  }

  getByTeamId = async (teamFebId: string) => {
    const { data, error, status, statusText } = await database
      .from("game_player_stats")
      .select("*")
      .filter("team_feb_id", "eq", teamFebId)
    if (error || !data) throw new ApiError(status, statusText, error.code)

    const playersStatsMapped = data.map(mapGamePlayerStatsFromSupabase)

    const playersStatsGrouped = playersStatsMapped!.reduce((acc, stat) => {
      if (!acc[stat.playerFebId]) {
        acc[stat.playerFebId] = []
      }
      acc[stat.playerFebId]!.push(stat)
      return acc
    }, {} as Record<string, GamePlayerStats[]>)

    return Object.values(playersStatsGrouped).map(getAverageGamePlayerStats)
  }
}
