import { database } from "../../../../../app/database/index.js"
import { mapGameTeamStatsToSupabase } from "./mappers.js"
import type { GameTeamStats } from "./types.js"

export class GameTeamStatsService {
  constructor() {}

  save = async (teamStats: GameTeamStats[]) => {
    const { error } = await database.from("game_team_stats").upsert(teamStats.map(mapGameTeamStatsToSupabase))
    return !error
  }
}
