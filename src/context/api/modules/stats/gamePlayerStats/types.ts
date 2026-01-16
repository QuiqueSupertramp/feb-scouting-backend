import type { Database } from "../../../../../app/database/supabase.js"
import type { ShotStats } from "../stats.types.js"

export interface GamePlayerStats {
  playerFebId: string
  gameFebId: string
  teamFebId: string
  local: boolean
  name: string
  minutes: number
  points: number
  twoPoints: ShotStats
  threePoints: ShotStats
  fieldGoals: ShotStats
  freeThrows: ShotStats
  offensiveRebounds: number
  defensiveRebounds: number
  totalRebounds: number
  assists: number
  steals: number
  turnovers: number
  foulsCommitted: number
  foulsDrawn: number
  pir: number
}

export type GamePlayerStatsSupabase = Database["public"]["Tables"]["game_player_stats"]["Row"]

export interface PlayerStatsSummary {
  teamFebId: string
  playerFebId: string
  name: string
  games: string[]
  stats: Omit<GamePlayerStats, "teamFebId" | "playerFebId" | "name" | "gameFebId" | "local">
}
