import type { Database } from "../../../../../app/database/supabase.js"
import type { ShotStats } from "../stats.types.js"

export interface GameTeamStats {
  gameFebId: string
  teamFebId: string
  local: boolean
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

export type GameTeamStatsSupabase = Database["public"]["Tables"]["game_team_stats"]["Row"]

export interface TeamStatsSummary {
  teamFebId: string
  games: string[]
  stats: Omit<GameTeamStats, "gameFebId" | "teamFebId">
}
