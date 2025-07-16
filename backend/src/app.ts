import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import authRoutes from './routes/auth.routes'
import noteRoutes from './routes/note.routes'
import { connectDB } from './config/db'

const app = express()

app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/note', noteRoutes)

const PORT = 8888
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`server up and running on localhost:${PORT}`),
  )
})
