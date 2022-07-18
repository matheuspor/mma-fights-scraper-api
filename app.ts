import express from 'express'
import 'dotenv/config'
import eventsRoutes from './routes/events-routes'
import eventCardRoutes from './routes/event-card-routes'
import scrapedData from './scraper/scraped-data'

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT || 3001
let deployedDate = new Date('2022-01-01').toLocaleDateString()

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use((_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET')
  res.set('Access-Control-Allow-Headers', '*')
  next()
})

app.use(async (_req, _res, next) => {
  await scrapedData.setup(deployedDate)
  deployedDate = new Date().toLocaleDateString()
  next()
})

app.use('/api', eventsRoutes)
app.use('/api', eventCardRoutes)

export default app
