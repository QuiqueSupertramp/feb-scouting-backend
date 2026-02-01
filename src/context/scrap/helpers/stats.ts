import type { ShotStats } from "../../api/modules/stats/stats.types.js"

export const fromStatsToNumber = (cell?: HTMLTableCellElement) => Number(cell?.textContent ?? 0)

export const fromStatsToShoot = (string: string = ""): ShotStats => {
  const text = string.trim() || ""
  const tiro = text.split(" ")[0] || ""
  const [a = 0, i = 0] = tiro.split("/")
  const made = Number(a) || 0
  const attempted = Number(i) || 0

  return { made, attempted }
}

export const formatPlayerName = (name: string = "") => {
  const nameOrdered = name.split(",").reverse().join(" ")
  return nameOrdered
    .trim()
    .split(" ")
    .map((s) => {
      const [firstLetter, ...restOfLetters] = s
      return `${firstLetter?.toUpperCase()}${restOfLetters.join("").toLowerCase()}`
    })
    .join(" ")
}
