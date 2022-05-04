import axios from 'axios';
import * as cheerio from 'cheerio';
import { BlueCornerCard, FightCard, IFight, RedCornerCard } from '../interfaces';

const eventsUrl = 'https://www.ufc.com.br/events';
const mainUrl = 'https://www.ufc.com';

export const fetchPageHtml = (url: string) => axios.get(url)
  .then((response) => response.data);

export const scrapeFights = async () => {
  const html = await fetchPageHtml(eventsUrl);
  const $ = cheerio.load(html);
  const fights: IFight[] = [];
  $('.c-card-event--result__info', html).each((index, element) => {
    const fightDetails = $(element).children('.c-card-event--result__date').find('a');
    const dateString = $(fightDetails).text().split(' ')[0];
    const date = new Date(`${dateString.split('.').slice(0, 2).reverse().join('.')}.${dateString.split('.').pop()}`);
    const time = `${$(fightDetails).text().split(' ')[2]} ${$(fightDetails).text().split(' ')[3]}`;
    const title = $(element).children('.c-card-event--result__headline').text();
    const url = mainUrl + $(fightDetails).attr('href');
    const fightNight = url.includes('fight-night');

    fights.push({
      _id: index,
      title,
      url,
      date,
      time,
      fightNight,
    });
    if (fights.length === 4) return false;
  });
  return fights;
};

export const scrapeFightsCard = async (fights: IFight[]) => {
  const fightCard: FightCard[] = [];
  await Promise.all(fights.map(async ({ url, _id }) => {
    const redCornerFighter: RedCornerCard[] = [];
    const blueCornerFighter: BlueCornerCard[] = [];
    const html = await fetchPageHtml(url);
    const $ = cheerio.load(html);

    // Reads page left side scraping the red corner fighters data (name and photo)
    $('.c-listing-fight__corner--red', html).each((_index, element) => {
      const fighterFirstName = $(element).find('div').children('.c-listing-fight__corner-given-name').text();
      const fighterFamilyName = $(element).find('div').children('.c-listing-fight__corner-family-name').text();
      const fighterPhoto = $(element).find('img').attr('src');
      redCornerFighter.push({ redCornerName: `${fighterFirstName} ${fighterFamilyName}`, redCornerPhoto: fighterPhoto });
    });

    // Reads page right side scraping the blue corner fighters data (name and photo)
    $('.c-listing-fight__corner--blue', html).each((_index, element) => {
      const fighterFirstName = $(element).find('div').children('.c-listing-fight__corner-given-name').text();
      const fighterFamilyName = $(element).find('div').children('.c-listing-fight__corner-family-name').text();
      const fighterPhoto = $(element).find('img').attr('src');
      blueCornerFighter.push({ blueCornerName: `${fighterFirstName} ${fighterFamilyName}`, blueCornerPhoto: fighterPhoto });
    });

    // Merge both arrays of fighters data
    const mergedArrays = redCornerFighter.map(({ redCornerName, redCornerPhoto }, index) => {
      const { blueCornerName } = blueCornerFighter[index];
      const { blueCornerPhoto } = blueCornerFighter[index];
      return { redCornerName, redCornerPhoto, blueCornerName, blueCornerPhoto };
    });

    // Push new object with the title fight and a card array with all fights in the same day 
    fightCard.push({ fight: _id, card: mergedArrays });
  }));
  return fightCard;
};