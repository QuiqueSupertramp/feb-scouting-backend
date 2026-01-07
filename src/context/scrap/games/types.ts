import type { ShotStats } from "../../api/modules/stats/stats.types.js"

export interface ScrapPlayerStats {
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

export interface ScrapTeamStats {
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

export interface ScrapTeamScores {
  total: number
  quarters: number[]
}

export interface ScrapGameTeamData {
  teamFebId: string
  scores: ScrapTeamScores
  teamStats: ScrapTeamStats
  playerStats: ScrapPlayerStats[]
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
