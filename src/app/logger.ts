/** biome-ignore-all lint/suspicious/noExplicitAny: <any> */
import { styleText } from "node:util"

const logError = (message: string) => console.error(styleText("redBright", message))
const logInfo = (message: string) => console.error(styleText("blueBright", message))
const logSuccess = (message: string) => console.error(styleText("greenBright", message))

type Messages = (string | [string, any])[]

const logErrorBLock = (messages: Messages) => {
  logBlock(() => {
    console.error(styleText(["redBright", "bold"], "⛔ ERROR"))
    messages.forEach((m) => {
      if (typeof m === "string") logError(m)
      else console.log(styleText("redBright", m[0]), m[1])
    })
  })
}
const logInfoBLock = (messages: Messages) => {
  logBlock(() => {
    console.log(styleText(["blueBright", "bold"], "ℹ️ INFO"))
    messages.forEach((m) => {
      if (typeof m === "string") logInfo(m)
      else console.log(styleText("blueBright", m[0]), m[1])
    })
  })
}
const logSuccessBLock = (messages: Messages) => {
  logBlock(() => {
    console.log(styleText(["greenBright", "bold"], "⭐ SUCCESS"))
    messages.forEach((m) => {
      if (typeof m === "string") logSuccess(m)
      else console.log(styleText("greenBright", m[0]), m[1])
    })
  })
}

const logBlock = (fn: () => void) => {
  console.log("-----------------------------------------")
  fn()
  console.log("-----------------------------------------")
}

export const LOGGER = {
  error: (messages: (string | [string, any])[] | string) =>
    typeof messages === "string" ? logError(messages) : logErrorBLock(messages),

  info: (messages: (string | [string, any])[] | string) =>
    typeof messages === "string" ? logInfo(messages) : logInfoBLock(messages),

  success: (messages: (string | [string, any])[] | string) =>
    typeof messages === "string" ? logSuccess(messages) : logSuccessBLock(messages),
}
