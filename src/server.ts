import app from "./app.js"
import { ENV } from "./env.js"

import "./context/cron/jobs/index.js"

app.listen(ENV.PORT, () => {
  console.log(`API is running at http://localhost:${ENV.PORT}`)
})
