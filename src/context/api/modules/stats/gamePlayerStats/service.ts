import { database } from "../../../../../app/database/index.js"
import { ApiError } from "../../../../../app/errors/apiError.js"
import { LOGGER } from "../../../../../app/logger.js"
import { getAverageGamePlayerStats } from "./helpers/getAverageGamePlayerStats.js"
import { mapGamePlayerStatsFromSupabase, mapGamePlayerStatsToSupabase } from "./mappers.js"
import type { GamePlayerStats } from "./types.js"

export class GamePlayerStatsService {
  private readonly keys = [
    "assists",
    "defensive_rebounds",
    "free_throws",
    "minutes",
    "offensive_rebounds",
    "pir",
    "points",
    "steals",
    "three_points",
    "total_rebounds",
    "turnovers",
    "two_points",
  ]

  save = async (stats: GamePlayerStats[]) => {
    const { error } = await database.from("game_player_stats").upsert(stats.map(mapGamePlayerStatsToSupabase))
    LOGGER.error(["message: Error saving game player stats", ["error:", error]])
    return !error
  }

  getByTeamId = async (teamFebId: string) => {
    const { data, error, status, statusText } = await database
      .from("game_player_stats")
      .select("*")
      .filter("team_feb_id", "eq", teamFebId)
    if (error || !data) throw new ApiError(status, statusText, error.code)

    const playersStatsMapped = data.map(mapGamePlayerStatsFromSupabase)

    const playersStatsGrouped = playersStatsMapped.reduce(
      (acc, stat) => {
        if (!acc[stat.playerFebId]) {
          acc[stat.playerFebId] = []
        }
        acc[stat.playerFebId]?.push(stat)
        return acc
      },
      {} as Record<string, GamePlayerStats[]>,
    )

    return Object.values(playersStatsGrouped).map(getAverageGamePlayerStats)
  }

  getRanking = async (key: string, range: [number, number] = [0, 9]) => {
    if (!this.keys.includes(key)) throw new ApiError(404, `No es existe ningún campo ${key}`)

    const { data, error, status, statusText } = await database
      .from("player_avg_points")
      .select("*")
      .order(key, { ascending: false })
      .range(range[0], range[1])
    if (error || !data) throw new ApiError(status, statusText, error.code)
    return data
  }
}
