import { Router } from 'express'
import scrapedData from '../scraper/scraped-data'

const eventsRoutes = Router()

eventsRoutes.get('/events', (_req, res) => {
  const { events } = scrapedData
  return res.status(200).json(events)
})

export default eventsRoutes
