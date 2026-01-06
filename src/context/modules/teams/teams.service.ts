import { database } from "../../../app/database/index.js"
import { ApiError } from "../../../app/errors/apiError.js"
import { mapTeamDataFromSupabase } from "./teams.mappers.js"

export class TeamsService {
  constructor() {}

  getAll = async () => {
    const { data, error, status, statusText } = await database.from("teams").select("*").order("team_feb_id")
    if (error || !data) throw new ApiError(status, statusText, error.code)
    return data.map(mapTeamDataFromSupabase)
  }
}
