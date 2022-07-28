import { IScrapedData } from '../interfaces'
import { scrapeEvents, scrapeEventsFights } from './helper'

export default class Scraper {
  public UFCData: IScrapedData = {
    events: [],
    eventCard: [],
  }

  public async setup(deployedDate: string) {
    const currentDate = new Date().toLocaleDateString()
    if (currentDate > deployedDate) {
      console.log('Scraping events...')
      this.UFCData.events = await scrapeEvents()
      this.UFCData.eventCard = await scrapeEventsFights(this.UFCData.events)
    }
  }
}