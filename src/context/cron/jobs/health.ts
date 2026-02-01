import { CronJob } from "cron"
import { logErrorBLock } from "../../../app/logger.js"

new CronJob(
  "*/14 * * * *",
  async () => {
    try {
      await fetch("https://feb-scouting-backend.onrender.com/healthz")
    } catch (error) {
      console.log("-----------------------------------------")
      logErrorBLock(["❌ Error on health job"])
      console.log(error)
      console.log("-----------------------------------------")
    }
  },
  null,
  true,
  "Europe/Madrid",
)
