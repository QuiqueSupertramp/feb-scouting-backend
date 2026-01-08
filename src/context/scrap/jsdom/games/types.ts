import type { GamePlayerStats } from "../../../api/modules/stats/gamePlayerStats/types.js"
import type { GameTeamStats } from "../../../api/modules/stats/gameTeamStats/types.js"

export interface ScrapTeamScores {
  total: number
  quarters: number[]
}

export interface ScrapGameTeamData {
  teamFebId: string
  scores: ScrapTeamScores
  teamStats: GameTeamStats
  playerStats: GamePlayerStats[]
}

export interface ScrapGameData {
  gameFebId: string
  local: ScrapGameTeamData
  away: ScrapGameTeamData
}

export interface ScrapGameResponse {
  success: boolean
  data: ScrapGameData
}
