import app from "./app.js"
import { ENV } from "./env.js"

app.listen(ENV.PORT, () => {
  console.log(`API is running at http://localhost:${ENV.PORT}`)
})
