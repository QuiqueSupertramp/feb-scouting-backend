import type { CorsOptions } from "cors"

const WHITELIST = ["http://localhost:5173", "https://feb-scouting-frontend.onrender.com"]

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)

    if (WHITELIST.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS: origen no permitido ${origin}`))
  },
  credentials: true,
  optionsSuccessStatus: 200,
}
