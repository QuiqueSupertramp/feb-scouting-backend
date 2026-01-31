import { CronJob } from "cron"
import { styleText } from "node:util"

new CronJob(
  "*/14 * * * *",
  async () => {
    try {
      await fetch("https://feb-scouting-backend.onrender.com/healthz")
      // console.log("health:", `(${data.status}) => ${data.statusText}`)
    } catch (error) {
      console.log('-----------------------------------------')
      console.log(styleText('red', '❌ Error on health job'))
      console.log(error)
      console.log('-----------------------------------------')
    }
  },
  null,
  true,
  "Europe/Madrid",
)
