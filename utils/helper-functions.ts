import axios from 'axios';
import * as cheerio from 'cheerio';
import { Card, FightCard, IFight } from '../interfaces';

const eventsUrl = 'https://www.ufc.com.br/events';
const mainUrl = 'https://www.ufc.com';

export const fetchPageHtml = (url: string) => axios.get(url)
  .then((response) => response.data);

export const fetchFights = async () => {
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

    if (fights.length < 4) {
      fights.push({
        title,
        url,
        date,
        time,
        fightNight,
      });
    }
  });
  return fights;
};

export const fetchFightsCard = async (fights: IFight[]) => {
  const fightCard: FightCard[] = [];
  await Promise.all(fights.map(async ({ url, title }) => {
    const html = await fetchPageHtml(url);
    const redCornerFighters: Card[] = [];
    const blueCornerFighters: Card[] = [];
    const $ = cheerio.load(html);
    $('.c-listing-fight__corner--red', html).each((index, element) => {
      const fighterFirstName = $(element).find('div').children('.c-listing-fight__corner-given-name').text();
      const fighterFamilyName = $(element).find('div').children('.c-listing-fight__corner-family-name').text();
      const fighterPhoto = $(element).find('img').attr('src');
      redCornerFighters.push({ redCornerName: `${fighterFirstName} ${fighterFamilyName}`, redCornerPhoto: fighterPhoto });
    });
    $('.c-listing-fight__corner--blue', html).each((index, element) => {
      const fighterFirstName = $(element).find('div').children('.c-listing-fight__corner-given-name').text();
      const fighterFamilyName = $(element).find('div').children('.c-listing-fight__corner-family-name').text();
      const fighterPhoto = $(element).find('img').attr('src');
      blueCornerFighters.push({ blueCornerName: `${fighterFirstName} ${fighterFamilyName}`, blueCornerPhoto: fighterPhoto });
    });
    const mergedArrays = redCornerFighters.map(({ redCornerName, redCornerPhoto }, index) => {
      const { blueCornerName } = blueCornerFighters[index];
      const { blueCornerPhoto } = blueCornerFighters[index];
      return { redCornerName, redCornerPhoto, blueCornerName, blueCornerPhoto };
    });
    fightCard.push({ title, card: mergedArrays });
  }));
  return fightCard;
};