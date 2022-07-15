import express from 'express'
import 'dotenv/config'
import fightsCardRoutes from './routes/fights-card-routes'
import eventsRoutes from './routes/events-routes'
import { ExtendedRequest, IEvent, IFightCard } from './interfaces'
import { scrapeEvents, scrapeEventsFights } from './helper-functions/scraper'

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT || 3001
let deployedDate = new Date('2022-01-01').toLocaleDateString()
let dailyEvents: IEvent[] = []
let dailyEventsFights: IFightCard[] = []

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use((_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET')
  res.set('Access-Control-Allow-Headers', '*')
  next()
})

app.use(async (req: ExtendedRequest, _res, next) => {
  if (new Date().toLocaleDateString() > deployedDate) {
    dailyEvents = await scrapeEvents()
    dailyEventsFights = await scrapeEventsFights(dailyEvents)
    deployedDate = new Date().toLocaleDateString()
  }
  req.events = dailyEvents
  req.eventsFights = dailyEventsFights
  next()
})

app.use('/api', eventsRoutes)
app.use('/api', fightsCardRoutes)

export default app
