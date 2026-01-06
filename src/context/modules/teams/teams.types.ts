import type { Database } from "../../../app/database/supabase.js"

export interface Team {
  febId: string
  name: string
  prettyName: string
  leagueId: number
}

export type TeamSupabase = Database["public"]["Tables"]["teams"]["Row"]
