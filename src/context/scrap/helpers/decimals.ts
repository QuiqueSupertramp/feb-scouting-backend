export const round2Decimals = (valor: number): number => {
  return Number(valor.toFixed(1))
}

export const round2DecimalsPercentage = (valor: number): number => {
  return Number((valor * 100).toFixed(2))
}
