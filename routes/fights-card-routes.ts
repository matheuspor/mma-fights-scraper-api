import { Router } from 'express'
import { ExtendedRequest } from '../interfaces'

const fightsCardRoutes = Router()

fightsCardRoutes.get('/fights-card', (req: ExtendedRequest, res) => {
  const { eventsFights } = req
  eventsFights?.sort((a, b) => a.event - b.event)
  return res.status(200).json(eventsFights)
})

fightsCardRoutes.get('/fights-card/:id', (req: ExtendedRequest, res) => {
  const { eventsFights } = req
  const { id } = req.params
  const fightCard = eventsFights?.find(({ event }) => event === Number(id)) || {}
  return res.status(200).json(fightCard)
})

export default fightsCardRoutes