import type { Database } from "../../../../app/database/supabase.js"

export interface Score {
  gameFebId: string
  round: number
  date: string
  time: string
  localTeamFebId: string
  localScore: number
  localQuarters: number[]
  awayTeamFebId: string
  awayScore: number
  awayQuarters: number[]
}

export type ScoreSupabase = Database["public"]["Tables"]["scores"]["Row"]

export interface TeamScoreAverage {
  teamFebId: string
  avgPoints: number
  avgQuarters: number[]
}
