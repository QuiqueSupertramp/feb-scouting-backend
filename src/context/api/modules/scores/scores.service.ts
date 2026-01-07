import { database } from "../../../../app/database/index.js"
import { ApiError } from "../../../../app/errors/apiError.js"
import { mapScoreToSupabase } from "./scores.mappers.js"
import type { Score, ScoreSupabase } from "./scores.types.js"

export class ScoresService {
  constructor() {}

  getAllIds = async () => {
    const { data, error, status, statusText } = await database.from("scores").select("game_feb_id")
    if (error || !data) throw new ApiError(status, statusText, error.code)
    const scoresIds = data.map(score => score.game_feb_id)
    return scoresIds
  }

  save = async (scores: Score[]) => {
    const { error } = await database.from("scores").upsert(scores.map(mapScoreToSupabase))
    return !error
  }
}
