import axios from 'axios'
import * as cheerio from 'cheerio'
import { IEvent, IEventCard, IFight } from '../interfaces'

const eventsUrl = 'https://www.ufc.com.br/events'
const mainUrl = 'https://www.ufc.com'

export const fetchPageHtml = (url: string) => axios.get(url)
  .then((response) => response.data)

const formatFighterName = (name: string) => {
  const formattedName = name.split(' ').filter((str) => (str !== '\n' && str !== '')).map((str) => str.replace(/\n/g, ''))
  return formattedName.join(' ')
}

export const scrapeEvents = async () => {
  const html = await fetchPageHtml(eventsUrl)
  const $ = cheerio.load(html)
  const fights: IEvent[] = []
  $('.c-card-event--result__info', html).each((index, element) => {
    const fightDetails = $(element).children('.c-card-event--result__date').find('a')
    const dateString = $(fightDetails).text().split(' ')[0]
    const formattedDate = `${dateString.split('.').slice(0, 2).reverse().join('.')}.${dateString.split('.').pop()}`
    const date = new Date(formattedDate)
    const time = `${$(fightDetails).text().split(' ')[2]} ${$(fightDetails).text().split(' ')[3]}`
    const title = $(element).children('.c-card-event--result__headline').text()
    const url = mainUrl + $(fightDetails).attr('href')
    const eventType = url.split('/')
    const event = url.includes('fight-night') ? 'UFC-FightNight' : eventType[eventType.length - 1].toUpperCase()
    const lastFightDate = fights.length ? fights[fights.length - 1].date : 0

    if (date > lastFightDate) {
      fights.push({
        _id: index + 1,
        title,
        url,
        date,
        time,
        event,
      })
    }
  })
  return fights.splice(0, 4)
}

export const scrapeEventsFights = async (events: IEvent[]) => {
  const fightCard: IEventCard[] = []
  await Promise.all(events.map(async ({ url, _id }) => {
    const fights: IFight[] = []
    const html = await fetchPageHtml(url)
    const $ = cheerio.load(html)

    $('.l-listing__item', html).each((_index, element) => {
      const redCornerFighterText = $(element).find('.c-listing-fight__corner-name--red').text()
      const blueCornerFighterText = $(element).find('.c-listing-fight__corner-name--blue').text()
      const redCornerFighter = formatFighterName(redCornerFighterText)
      const blueCornerFighter = formatFighterName(blueCornerFighterText)
      fights.push({
        redCornerFighter,
        blueCornerFighter,
      })
    })
    fightCard.push({ _id, fights })
  }))
  return fightCard
}