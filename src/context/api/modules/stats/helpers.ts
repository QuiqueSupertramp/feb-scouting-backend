import { round2Decimals, round2DecimalsPercentage } from "../../../scrap/helpers/decimals.js"
import type { ShotStats } from "./stats.types.js"

export const divideShots = (tiro: ShotStats, divisor: number): ShotStats => {
  if (divisor <= 0) return { made: 0, attempted: 0, percentage: 0 }
  const made = tiro.made / divisor
  const attempted = tiro.attempted / divisor
  const percentage = attempted > 0 ? made / attempted : 0
  return {
    made: round2Decimals(made),
    attempted: round2Decimals(attempted),
    percentage: round2DecimalsPercentage(percentage),
  }
}
