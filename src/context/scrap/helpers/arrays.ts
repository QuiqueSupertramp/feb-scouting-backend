import type { ScrapScore } from "../jsdom/score/types.js"

export const removeDuplicateScores = (scores: ScrapScore[]): ScrapScore[] => {
  const uniques = new Set<string>()
  return scores.filter((score) => {
    if (uniques.has(score.gameFebId)) {
      return false
    }
    uniques.add(score.gameFebId)
    return true
  })
}

export const filterExistingScores = (scores: ScrapScore[], idsToRemove: string[]): ScrapScore[] => {
  const idSet = new Set(idsToRemove)
  return scores.filter((score) => !idSet.has(score.gameFebId))
}

export const removeEmptyItems = <T>(value: T | null | undefined): value is T => value != null
