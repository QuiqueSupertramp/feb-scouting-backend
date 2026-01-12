import { CronJob } from "cron"
import app from "./app.js"
import { ENV } from "./env.js"

app.listen(ENV.PORT, () => {
  console.log(`API is running at http://localhost:${ENV.PORT}`)
})

new CronJob("*/14 * * * *", async () => {
  const data = await fetch("https://feb-scouting-backend.onrender.com/healthz")
  console.log("health:", `(${data.status}) => ${data.statusText}`)
}).start()
