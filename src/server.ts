import { CronJob } from "cron"
import app from "./app.js"
import { ENV } from "./env.js"
import { cronGames } from "./context/cron/games/index.js"

app.listen(ENV.PORT, () => {
  console.log(`API is running at http://localhost:${ENV.PORT}`)
})

new CronJob("*/14 * * * *", async () => {
  const data = await fetch("https://feb-scouting-backend.onrender.com/healthz")
  console.log("health:", `(${data.status}) => ${data.statusText}`)
}).start()

new CronJob(
  "0 30 21 * * 1-5",
  async () => {
    const res = await cronGames()
    console.log("cronGames:", res)
  },
  null,
  true,
  "Europe/Madrid",
)

new CronJob(
  "0 0 17-23 * * 6",
  async () => {
    const res = await cronGames()
    console.log("cronGames:", res)
  },
  null,
  true,
  "Europe/Madrid",
)

new CronJob(
  "0 0 12-23 * * 0",
  async () => {
    const res = await cronGames()
    console.log("cronGames:", res)
  },
  null,
  true,
  "Europe/Madrid",
)
