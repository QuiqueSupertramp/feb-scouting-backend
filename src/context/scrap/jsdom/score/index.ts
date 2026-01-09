import { getScoreData } from "./getScoreData.js"
import { ApiError } from "../../../../app/errors/apiError.js"
import { getDocument } from "../getDocument.js"

const SCORES_BASE_URL = "https://baloncestoenvivo.feb.es/racha"

export const scrapScores = async (teamId: string) => {
  const scoresURL = `${SCORES_BASE_URL}/${teamId}`
  const scoresDocument = await getDocument(scoresURL)
  if (!scoresDocument) throw new ApiError(400, `Impossible to scrap games for team ${teamId}`)

  const rows = Array.from(scoresDocument.querySelectorAll("table tbody tr"))
  rows.shift()

  return rows.map((r) => getScoreData(r))
}
