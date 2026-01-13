import { CronJob } from "cron"
import { cronGames } from "../games/index.js"

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
