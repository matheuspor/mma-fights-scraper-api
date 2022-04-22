import axios from 'axios';
import * as cheerio from 'cheerio';
import { IFight } from '../interfaces';

const eventsUrl = 'https://www.ufc.com.br/events';
const mainUrl = 'https://www.ufc.com';

export const fetchFights = () => axios(eventsUrl)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const fights: IFight[] = [];
    $('.c-card-event--result__info', html).each((index, element) => {
      const fightDetails = $(element).children('.c-card-event--result__date').find('a');
      const dateString = $(fightDetails).text().split(' ')[0];
      const date = new Date(`${dateString.split('.').slice(0, 2).reverse().join('.')}.${dateString.split('.').pop()}`);
      const time = `${$(fightDetails).text().split(' ')[2]} GMT ${$(fightDetails).text().split(' ')[3]}`;
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
  });

export const fillFightCards = async () => undefined;
// {
// const fights = await fetchFights() as Fight[];
// const fightCards = [];
// fights.forEach(({ url, title }) => axios(url).then((response) => {
//  const FightCard = {
//      title,
//      card: [],
//    } as FightCard;
//    const html = response.data;
// const $ = cheerio.load(html);
//    $('.c-listing-fight__corner-name', html).each((index, element) => {
// const fighterName = $(element).text();
//  console.log(fighterName);
//  });
//  }));
// };