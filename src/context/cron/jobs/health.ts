import { CronJob } from "cron"
import { LOGGER } from "../../../app/logger.js"

new CronJob(
  "*/14 * * * *",
  async () => {
    try {
      await fetch("https://feb-scouting-backend.onrender.com/healthz")
    } catch (error) {
      LOGGER.error(["❌ Error on health job", ["error:", error]])
    }
  },
  null,
  true,
  "Europe/Madrid",
)
