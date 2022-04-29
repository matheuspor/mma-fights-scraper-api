import { fetchFights, fetchFightsCard } from '../../scraper/scraper-functions';
import * as FightService from '../../services/fight-service';
import * as FightsCardService from '../../services/fights-card-service';

// eslint-disable-next-line import/prefer-default-export
export const populateDatabase = async () => {
  await Promise.all([FightsCardService.deleteMany(), FightService.deleteMany()]);

  const fights = await fetchFights();
  const inserted = await FightService.create(fights);

  const fightsCard = await fetchFightsCard(inserted);
  await FightsCardService.create(fightsCard);
};