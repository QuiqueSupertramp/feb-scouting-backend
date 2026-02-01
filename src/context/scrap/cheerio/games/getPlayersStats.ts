import type { CheerioAPI } from "cheerio"

export const getPlayersStats = ($: CheerioAPI) =>
  $(".responsive-scroll table")
    .map((i, tabla) => {
      const filasJugadores = $(tabla)
        .find("tr:not(.row-total)")
        .slice(2)
        .map((i, tr) => {
          const tds = $(tr).find("td")

          const rowData = tds
            .map((j, td) => {
              const $td = $(td)
              const text = $td.text().trim()
              if (j === 2) {
                const link = $td.find("a").attr("href") ?? ""
                if (link) {
                  try {
                    const idJugador = new URL(link).searchParams.get("c") ?? ""
                    return [text, idJugador]
                  } catch (e) {
                    return [text, ""]
                  }
                }
              }
              return text
            })
            .get()

          return [rowData]
        })
        .get()

      return [filasJugadores]
    })
    .get() as unknown as [string[][], string[][]]
