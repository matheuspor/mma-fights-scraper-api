import { scrapeEvents, scrapeEventsFights } from './scraper'
import * as eventService from '../services/event-service'
import * as fightsCardService from '../services/fights-card-service'

const populateDatabase = () => {  
  console.log('populating...')

  return Promise.all([eventService.deleteMany(), fightsCardService.deleteMany()])
    .then(() => Promise.all([scrapeEvents(), scrapeEventsFights()]))
    .then((values) => Promise.all(
      [eventService.create(values[0]), fightsCardService.create(values[1])],
    ))
}

export default populateDatabase
