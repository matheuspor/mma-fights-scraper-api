import { IEvent, IFightCard } from '../interfaces'
import { scrapeEvents, scrapeEventsFights } from './helper'

export default class Scraper {
  public events: IEvent[]

  public eventCard: IFightCard[]

  constructor() {
    this.events = []
    this.eventCard = []
  }

  public async setup(deployedDate: string) {
    const currentDate = new Date().toLocaleDateString()
    if (currentDate > deployedDate) {
      console.log('Scraping events...')
      this.events = await scrapeEvents()
      this.eventCard = await scrapeEventsFights(this.events)
    }
  }
}