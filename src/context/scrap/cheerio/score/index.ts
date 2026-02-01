import { formatDate } from "../../helpers/time.js"
import { getDocument } from "../getDocument.js"
import { getScoreData } from "./getScoreData.js"

export interface ScrapScore {
  gameFebId: string
  round: number
  date: string
  time: string
}

const SCORES_BASE_URL = "https://baloncestoenvivo.feb.es/racha"

export const scrapScores = async (teamFebId: string) => {
  const scoresURL = `${SCORES_BASE_URL}/${teamFebId}`

  const $ = await getDocument(scoresURL)
  if (!$) return undefined

  const scoreData = getScoreData($)

  const scores = scoreData.map((s) => ({
    gameFebId: s[3] ?? "0",
    round: Number(s[0] ?? "0"),
    date: formatDate(s[4] ?? "0/0/1900"),
    time: s[5] ?? "00:00",
  })) as ScrapScore[]

  return scores
}
