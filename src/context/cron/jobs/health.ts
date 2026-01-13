import { CronJob } from "cron"

new CronJob(
  "*/14 * * * *",
  async () => {
    const data = await fetch("https://feb-scouting-backend.onrender.com/healthz")
    console.log("health:", `(${data.status}) => ${data.statusText}`)
  },
  null,
  true,
  "Europe/Madrid",
)
