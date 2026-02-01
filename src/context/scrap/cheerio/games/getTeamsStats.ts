import type { CheerioAPI } from "cheerio"

export const getTeamsStats = ($: CheerioAPI) =>
  $(".row-total")
    .map((i, row) => {
      const teamStats = $(row)
        .find("td")
        .map((i, el) => $(el).text().trim())
        .get()

      return [teamStats]
    })
    .get() as unknown as [string[], string[]]
