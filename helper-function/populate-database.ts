import { scrapeEvents, scrapeFightsCard } from './scraper';
import * as eventService from '../services/event-service';
import * as fightsCardService from '../services/fights-card-service';

const populateDatabase = async () => {  
  console.log('populating...');
  const events = await scrapeEvents();
  const eventsFights = await scrapeFightsCard(events);

  return Promise.all([eventService.deleteMany(), fightsCardService.deleteMany()])
    .then(() => Promise.all([eventService.create(events), fightsCardService.create(eventsFights)]));
};

export default populateDatabase;
