import { ApiError } from "../../../../app/errors/apiError.js"
import { formatDate } from "../../helpers/time.js"

export const getScoreData = (gameRow: Element) => {
  const tds = Array.from(gameRow.querySelectorAll("td"))
  const [roundTd, teams, score, dateTd, timeTd] = tds
  const round = roundTd?.textContent?.trim()
  const date = dateTd?.textContent?.trim()
  const time = timeTd?.textContent?.trim()

  if (!round || !date || !time || !teams || !score) throw new ApiError(404, "Error scraping scores")

  const a = score.querySelector("a")
  const url = a?.getAttribute("href") ?? ""
  const gameFebId = new URL(url).searchParams.get("p") || "0"

  return {
    gameFebId,
    round: Number(round),
    date: formatDate(date),
    time,
  }
}
