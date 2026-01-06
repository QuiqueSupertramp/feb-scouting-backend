import express from "express"
import cors from "cors"
import { notFoundHandler } from "./app/middlewares/notFoundHandler.js"
import { errorHandler } from "./app/middlewares/errorHandler.js"
import apiRouter from "./context/modules/router.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", apiRouter)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
