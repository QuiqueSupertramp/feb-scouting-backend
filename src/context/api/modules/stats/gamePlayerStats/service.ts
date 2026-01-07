import { database } from "../../../../../app/database/index.js"
import { mapGamePlayerStatsToSupabase } from "./mappers.js"
import type { GamePlayerStats } from "./types.js"

export class GamePlayerStatsService {
  constructor() {}

  save = async (stats: GamePlayerStats[]) => {
    const { error } = await database.from("game_player_stats").upsert(stats.map(mapGamePlayerStatsToSupabase))
    return !error
  }
}
