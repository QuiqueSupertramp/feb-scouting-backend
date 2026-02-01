import type { CheerioAPI } from "cheerio"

export const getScoreData = ($: CheerioAPI) =>
  $(".wrapper-seccion-contents table tr")
    .slice(1)
    .map((i, tr) => {
      const tds = $(tr).find("td")
      const tdsMapped = tds
        .map((i, td) => {
          const $td = $(td)
          const text = $td.text().trim()
          if (i === 2) {
            const link = $td.find("a").attr("href") ?? ""
            if (link) {
              try {
                const idPartido = new URL(link, "https://baloncestoenvivo.feb.es").searchParams.get("p") ?? ""
                return [text, idPartido]
              } catch (e) {
                return [text, ""]
              }
            }
          }
          return text
        })
        .get()
      return [tdsMapped]
    })
    .get() as unknown as string[][]
