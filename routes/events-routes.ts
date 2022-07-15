import { Router } from 'express'
import { ExtendedRequest } from '../interfaces'

const eventsRoutes = Router()

eventsRoutes.get('/events', (req: ExtendedRequest, res) => {
  const { events } = req
  return res.status(200).json(events)
})

export default eventsRoutes
