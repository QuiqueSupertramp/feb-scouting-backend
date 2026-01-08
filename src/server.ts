import app from "./app.js"
import { GamePlayerStatsService } from "./context/api/modules/stats/gamePlayerStats/service.js"
import { ENV } from "./env.js"

app.listen(ENV.PORT, () => {
  console.log(`API is running at http://localhost:${ENV.PORT}`)
})

const x = await new GamePlayerStatsService().getByTeamId("979311")
console.log("x:", x)
