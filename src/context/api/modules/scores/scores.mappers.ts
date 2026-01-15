import type { Score, ScoreSupabase, ScoreWithNames } from "./scores.types.js"
interface Data {
  name: string
  pretty_name: string
}

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
  localScore: score.local_score,
  localQuarters: score.local_quarters,
  awayTeamFebId: score.away_team_feb_id,
  awayScore: score.away_score,
  awayQuarters: score.away_quarters,
})

export const mapScoreWithNamesFromSupabase = (
  score: ScoreSupabase & { local_team: Data; away_team: Data },
): ScoreWithNames => ({
  gameFebId: score.game_feb_id,
  round: score.round,
  date: score.date,
  time: score.time,
  localTeamFebId: score.local_team_feb_id,
  localScore: score.local_score,
  localQuarters: score.local_quarters,
  localName: score.local_team.name,
  localPrettyName: score.local_team.pretty_name,
  awayTeamFebId: score.away_team_feb_id,
  awayScore: score.away_score,
  awayQuarters: score.away_quarters,
  awayName: score.away_team.name,
  awayPrettyName: score.away_team.pretty_name,
})
