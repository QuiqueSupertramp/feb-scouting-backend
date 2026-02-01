export const getMillisecondsFromTime = (time: string = "") => {
  const [m = 0, s = 0] = time.split(":")
  const minutes = Number(m) || 0
  const seconds = Number(s) || 0

  const mMs = minutes * 60 * 1000
  const sMs = seconds * 1000

  return mMs + sMs
}

export const getTimeFromMiliseconds = (miliseconds: number = 0) => {
  const totalSeconds = Math.floor(miliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const m = minutes <= 9 ? `0${minutes.toString()}` : minutes.toString()
  const s = seconds <= 9 ? `0${seconds.toString()}` : seconds.toString()
  return `${m}:${s}`
}

export const divideTime = (time: string, divider: number) => {
  if (divider <= 0) return "00:00"
  const ms = getMillisecondsFromTime(time)
  return getTimeFromMiliseconds(ms / divider)
}

export const formatDate = (date: string) => {
  const [day, month, year] = date.split("/")
  return `${year}-${month}-${day}`
}
