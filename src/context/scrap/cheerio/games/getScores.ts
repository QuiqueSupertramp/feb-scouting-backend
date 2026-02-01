import type { CheerioAPI } from "cheerio"
import type { GameScore } from "../../../api/modules/scores/scores.types.js"

export const getScores = ($: CheerioAPI): GameScore => {
  const localHref = $(".fila .local .nombre a").attr("href") ?? ""
  const localTeamFebId = localHref ? (new URL(localHref).searchParams.get("i") ?? "") : ""
  const awayHref = $(".fila .visitante .nombre a").attr("href") ?? ""
  const awayTeamFebId = new URL(awayHref ?? "").searchParams.get("i") ?? ""

  const localScore = Number($(".fila .local .resultado").text().trim())
  const awayScore = Number($(".fila .visitante .resultado").text().trim())

  const localQuarters = $(".parciales .local span")
    .map((i, el) => Number($(el).text()))
    .get()
  const awayQuarters = $(".parciales .visitante span")
    .map((i, el) => Number($(el).text()))
    .get()

  return { localTeamFebId, localScore, localQuarters, awayTeamFebId, awayScore, awayQuarters }
}
