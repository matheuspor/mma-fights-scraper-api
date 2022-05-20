import { scrapeFights, scrapeFightsCard } from './scraper';
import * as FightService from '../services/fight-service';
import * as FightsCardService from '../services/fights-card-service';

const populateDatabase = async (deployedDate: string) => {
  if (new Date().toLocaleDateString() <= deployedDate) return;
  
  await Promise.all([FightService.deleteMany(), FightsCardService.deleteMany()]);

  const fights = await scrapeFights();

  await Promise.all(
    [
      FightService.create(fights),
      scrapeFightsCard(fights),
    ],
  ).then((values) => FightsCardService.create(values[1]));
};

export default populateDatabase;
