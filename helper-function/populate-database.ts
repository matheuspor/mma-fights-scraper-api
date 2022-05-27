import { scrapeEvents, scrapeFightsCard } from './scraper';
import * as eventService from '../services/event-service';
import * as FightsCardService from '../services/fights-card-service';

const populateDatabase = async () => {  
  await Promise.all([eventService.deleteMany(), FightsCardService.deleteMany()]);

  const events = await scrapeEvents();

  await Promise.all(
    [
      eventService.create(events),
      scrapeFightsCard(events),
    ],
  ).then((values) => FightsCardService.create(values[1]));
};

export default populateDatabase;
