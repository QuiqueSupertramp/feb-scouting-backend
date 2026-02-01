import type { Database } from "../../../../app/database/supabase.js"

export interface Score extends GameScore {
  gameFebId: string
  round: number
  date: string
  time: string
}

export interface GameScore {
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
