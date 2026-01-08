export const round2Decimals = (valor: number): number => {
  return Math.round((valor + Number.EPSILON) * 100) / 100
}

export const round2DecimalsPercentage = (valor: number): number => {
  return Math.round((valor * 100 + Number.EPSILON) * 100) / 100
}
