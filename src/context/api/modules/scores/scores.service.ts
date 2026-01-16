import { database } from "../../../../app/database/index.js"
import { ApiError } from "../../../../app/errors/apiError.js"
import { getClassifications } from "./helpers/classification.js"
import { mapScoreToSupabase, mapScoreWithNamesFromSupabase } from "./scores.mappers.js"
import type { Score } from "./scores.types.js"

export class ScoresService {
  getAllIds = async () => {
    const { data, error, status, statusText } = await database.from("scores").select("game_feb_id")
    if (error || !data) throw new ApiError(status, statusText, error.code)
    return data.map((score) => score.game_feb_id)
  }

  save = async (scores: Score[]) => {
    const { error } = await database.from("scores").upsert(scores.map(mapScoreToSupabase))
    return !error
  }

  getByTeamId = async (teamFebId: string) => {
    const { data, error, status, statusText } = await database
      .from("scores")
      .select(
        `*,local_team:teams!local_team_feb_id(name, pretty_name),away_team:teams!away_team_feb_id(name, pretty_name)`,
      )
      .or(`local_team_feb_id.eq.${teamFebId}, away_team_feb_id.eq.${teamFebId}`)
      .order("round", { ascending: false })

    if (error || !data) throw new ApiError(status, statusText, error.code)

    return data.map(mapScoreWithNamesFromSupabase)
  }

  getClassification = async () => {
    const { data, error, status, statusText } = await database
      .from("scores")
      .select(
        `*,local_team:teams!local_team_feb_id(name, pretty_name),away_team:teams!away_team_feb_id(name, pretty_name)`,
      )
    if (error || !data) throw new ApiError(status, statusText, error.code)
    return getClassifications(data.map(mapScoreWithNamesFromSupabase))
  }
}
