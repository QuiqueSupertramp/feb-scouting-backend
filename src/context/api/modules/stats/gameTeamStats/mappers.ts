import { round2DecimalsPercentage } from "../../../../scrap/helpers/decimals.js"
import type { GameTeamStats, GameTeamStatsSupabase } from "./types.js"

export const mapGameTeamStatsToSupabase = (stats: GameTeamStats): GameTeamStatsSupabase => ({
  team_feb_id: stats.teamFebId,
  game_feb_id: stats.gameFebId,
  local: stats.local,
  minutes: stats.minutes,
  points: stats.points,
  two_points_made: stats.twoPoints.made,
  two_points_attempted: stats.twoPoints.attempted,
  three_points_made: stats.threePoints.made,
  three_points_attempted: stats.threePoints.attempted,
  field_goals_made: stats.fieldGoals.made,
  field_goals_attempted: stats.fieldGoals.attempted,
  free_throws_made: stats.freeThrows.made,
  free_throws_attempted: stats.freeThrows.attempted,
  offensive_rebounds: stats.offensiveRebounds,
  defensive_rebounds: stats.defensiveRebounds,
  assists: stats.assists,
  steals: stats.steals,
  turnovers: stats.turnovers,
  fouls_committed: stats.foulsCommitted,
  fouls_drawn: stats.foulsDrawn,
  pir: stats.pir,
})

export const mapGameTeamStatsFromSupabase = (stats: GameTeamStatsSupabase): GameTeamStats => ({
  teamFebId: stats.team_feb_id,
  gameFebId: stats.game_feb_id,
  local: stats.local,
  minutes: stats.minutes,
  points: stats.points,
  twoPoints: {
    made: stats.two_points_made,
    attempted: stats.two_points_attempted,
    percentage: round2DecimalsPercentage(stats.two_points_made / stats.two_points_attempted),
  },
  threePoints: {
    made: stats.three_points_made,
    attempted: stats.three_points_attempted,
    percentage: round2DecimalsPercentage(stats.three_points_made / stats.three_points_attempted),
  },
  fieldGoals: {
    made: stats.field_goals_made,
    attempted: stats.field_goals_attempted,
    percentage: round2DecimalsPercentage(stats.field_goals_made / stats.field_goals_attempted),
  },
  freeThrows: {
    made: stats.free_throws_made,
    attempted: stats.free_throws_attempted,
    percentage: round2DecimalsPercentage(stats.free_throws_made / stats.free_throws_attempted),
  },
  offensiveRebounds: stats.offensive_rebounds,
  defensiveRebounds: stats.defensive_rebounds,
  totalRebounds: stats.offensive_rebounds + stats.defensive_rebounds,
  assists: stats.assists,
  steals: stats.steals,
  turnovers: stats.turnovers,
  foulsCommitted: stats.fouls_committed,
  foulsDrawn: stats.fouls_drawn,
  pir: stats.pir,
})
