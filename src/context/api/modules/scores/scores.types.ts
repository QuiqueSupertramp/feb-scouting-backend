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

export interface ScoreWithNames extends Score {
  localName: string
  localPrettyName: string
  awayName: string
  awayPrettyName: string
}

export type ScoreSupabase = Database["public"]["Tables"]["scores"]["Row"]
