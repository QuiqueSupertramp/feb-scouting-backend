import type { ShotStats } from "../../api/modules/stats/stats.types.js"

export const fromStatsToNumber = (cell?: HTMLTableCellElement) => Number(cell?.textContent ?? 0)

export const fromStatsToShoot = (cell?: HTMLTableCellElement): ShotStats => {
  const text = cell?.textContent.trim() || ""
  const tiro = text.split(" ")[0] || ""
  const [a = 0, i = 0] = tiro.split("/")
  const made = Number(a) || 0
  const attempted = Number(i) || 0

  return { made, attempted }
}
