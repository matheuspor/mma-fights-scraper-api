import express from 'express'
import 'dotenv/config'
import fightsCardRoutes from './routes/fights-card-routes'
import connectToDatabase from './models/connectToDatabase'
import populateDatabase from './helper-function/populate-database'
import eventsRoutes from './routes/events-routes'

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT || 3001
let deployedDate = new Date('2022-01-01').toLocaleDateString()

app.listen(PORT, async () => {
  connectToDatabase()
  console.log(`Server is running on port ${PORT}`)
})

app.use((_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET')
  res.set('Access-Control-Allow-Headers', '*')
  next()
})

app.use(async (_req, _res, next) => {
  if (new Date().toLocaleDateString() > deployedDate) {
    await populateDatabase()
    deployedDate = new Date().toLocaleDateString()
  }
  next()
})

app.use('/api', eventsRoutes)
app.use('/api', fightsCardRoutes)

export default app
