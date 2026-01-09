import { database } from "../../../../app/database/index.js"
import { ApiError } from "../../../../app/errors/apiError.js"
import { getAverageScore } from "./helpers/getAverageScore.js"
import { mapScoreFromSupabase, mapScoreToSupabase } from "./scores.mappers.js"
import type { Score } from "./scores.types.js"

export class ScoresService {
  getAllIds = async () => {
    const { data, error, status, statusText } = await database.from("scores").select("game_feb_id")
    if (error || !data) throw new ApiError(status, statusText, error.code)
    return data.map(score => score.game_feb_id)
  }

  save = async (scores: Score[]) => {
    const { error } = await database.from("scores").upsert(scores.map(mapScoreToSupabase))
    return !error
  }

  getByTeamId = async (teamFebId: string) => {
    const { data, error, status, statusText } = await database
      .from("scores")
      .select("*")
      .or(`local_team_feb_id.eq.${teamFebId}, away_team_feb_id.eq.${teamFebId}`)
      .order("round", { ascending: false })

    if (error || !data) throw new ApiError(status, statusText, error.code)

    return data.map(mapScoreFromSupabase)
  }

  getAverageByTeamId = async (teamFebId: string) => {
    const { data, error, status, statusText } = await database
      .from("scores")
      .select("*")
      .or(`local_team_feb_id.eq.${teamFebId}, away_team_feb_id.eq.${teamFebId}`)

    if (error || !data) throw new ApiError(status, statusText, error.code)

    const scoresMapped = data.map(mapScoreFromSupabase)

    return getAverageScore(scoresMapped, teamFebId)
  }
}
