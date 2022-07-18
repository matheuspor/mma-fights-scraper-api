import { Router } from 'express'
import scrapedData from '../scraper/scraped-data'

const eventCardRoutes = Router()

eventCardRoutes.get('/event-card', (_req, res) => {
  const { eventCard } = scrapedData
  eventCard.sort((a, b) => a._id - b._id)
  return res.status(200).json(eventCard)
})

eventCardRoutes.get('/event-card/:id', (req, res) => {
  const { eventCard } = scrapedData
  const { id } = req.params
  const fightCard = eventCard.find(({ _id }) => _id === Number(id)) || {}
  return res.status(200).json(fightCard)
})

export default eventCardRoutes