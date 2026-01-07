import type { ShotStats } from "../../api/modules/stats/stats.types.js"

export interface PlayerStats {
  gameFebId: string
  playerFebId: string
  teamFebId: string
  name: string
  minutes: string
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

export interface TeamStats {
  gameFebId: string
  teamFebId: string
  minutes: string
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

export interface TeamScores {
  total: number
  quarters: number[]
}

export interface GameTeamData {
  teamFebId: string
  scores: TeamScores
  teamStats: TeamStats
  playerStats: PlayerStats[]
}

export interface GameData {
  gameFebId: string
  local: GameTeamData
  away: GameTeamData
}

export interface ScrapGameResponse {
  success: boolean
  data: GameData
}
