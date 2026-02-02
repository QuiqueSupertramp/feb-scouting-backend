import { CronJob } from "cron"
import { cronGames } from "../games/index.js"
import { LOGGER } from "../../../app/logger.js"

new CronJob(
  "0 30 21 * * 1-5",
  async () => {
    try {
      const res = await cronGames()
      LOGGER.info([["cronGames:", res]])
    } catch (error) {
      LOGGER.error(["❌ Error on games job", ["error:", error]])
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
      LOGGER.info([["cronGames:", res]])
    } catch (error) {
      LOGGER.error(["❌ Error on games job", ["error:", error]])
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
      LOGGER.info([["cronGames:", res]])
    } catch (error) {
      LOGGER.error(["❌ Error on games job", ["error:", error]])
    }
  },
  null,
  true,
  "Europe/Madrid",
)
