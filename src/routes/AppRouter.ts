import { Router } from 'express'
import { IScrapedData } from '../interfaces'

class AppRouter {
  public router = Router()

  constructor(scrapedData: IScrapedData) {
    this.addRoute(scrapedData)
  }

  public addRoute(scrapedData: IScrapedData): void {
    this.router.get('/events', (_req, res) => {
      const { events } = scrapedData
      return res.status(200).json(events)
    })
    this.router.get('/event-card', (_req, res) => {
      const { eventCard } = scrapedData
      eventCard.sort((a, b) => a._id - b._id)
      return res.status(200).json(eventCard)
    })
    this.router.get('/event-card/:id', (req, res) => {
      const { eventCard } = scrapedData
      const { id } = req.params
      const fightCard = eventCard.find(({ _id }) => _id === Number(id)) || {}
      return res.status(200).json(fightCard)
    })
  }
}

export default AppRouter