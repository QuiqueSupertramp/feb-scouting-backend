import { styleText } from "node:util"

export const logError = (message: string) => console.error(styleText("redBright", message))

export const logErrorBLock = (messages: string[]) => {
  console.error(styleText(["redBright", "bold"], "⛔ ERROR"))
  messages.forEach(logError)
}
