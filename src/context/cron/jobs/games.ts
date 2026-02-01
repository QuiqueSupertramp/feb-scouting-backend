import { CronJob } from "cron"
import { cronGames } from "../games/index.js"
import { logErrorBLock } from "../../../app/logger.js"

new CronJob(
  "0 30 21 * * 1-5",
  async () => {
    try {
      const res = await cronGames()
      console.log("cronGames:", res)
    } catch (error) {
      console.log("-----------------------------------------")
      logErrorBLock(["❌ Error on games job"])
      console.log(error)
      console.log("-----------------------------------------")
    }
  },
  null,
  true,
  "Europe/Madrid",
)

new CronJob(
  "0 0 17-23 * * 6",
  async () => {
    try {
      const res = await cronGames()
      console.log("cronGames:", res)
    } catch (error) {
      console.log("-----------------------------------------")
      logErrorBLock(["❌ Error on games job"])
      console.log(error)
      console.log("-----------------------------------------")
    }
  },
  null,
  true,
  "Europe/Madrid",
)

new CronJob(
  "0 0 12-23 * * 0",
  async () => {
    try {
      const res = await cronGames()
      console.log("cronGames:", res)
    } catch (error) {
      console.log("-----------------------------------------")
      logErrorBLock(["❌ Error on games job"])
      console.log(error)
      console.log("-----------------------------------------")
    }
  },
  null,
  true,
  "Europe/Madrid",
)
