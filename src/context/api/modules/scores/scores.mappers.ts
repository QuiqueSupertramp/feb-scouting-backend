import type { Score, ScoreSupabase } from "./scores.types.js"

export const mapScoreToSupabase = (score: Score): ScoreSupabase => ({
  game_feb_id: score.gameFebId,
  round: score.round,
  date: score.date,
  time: score.time,
  local_team_feb_id: score.localTeamFebId,
  away_team_feb_id: score.awayTeamFebId,
  local_score: score.localScore,
  away_score: score.awayScore,
  local_quarters: score.localQuarters,
  away_quarters: score.awayQuarters,
})

export const mapScoreFromSupabase = (score: ScoreSupabase): Score => ({
  gameFebId: score.game_feb_id,
  round: score.round,
  date: score.date,
  time: score.time,
  localTeamFebId: score.local_team_feb_id,
  awayTeamFebId: score.away_team_feb_id,
  localScore: score.local_score,
  awayScore: score.away_score,
  localQuarters: score.local_quarters,
  awayQuarters: score.away_quarters,
})
