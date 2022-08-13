import axios from 'axios'
import * as cheerio from 'cheerio'
import { IEvent, IEventCard, IFight } from '../interfaces'

const eventsUrl = 'https://www.ufc.com.br/events'
const mainUrl = 'https://www.ufc.com'

export const fetchPageHtml = (url: string) => axios.get(url)
  .then((response) => response.data)

const formatAndMergeFighters = (redCornerFighters: string, blueCornerFighters: string) => {
  const mergedArrays: IFight[] = []
  const formattedRedCornerArray = redCornerFighters.split(' ').filter((name) => (name !== '\n' && name !== '')).map((name) => name.replace(/\n/g, ''))
  const formattedBlueCornerArray = blueCornerFighters.split(' ').filter((name) => (name !== '\n' && name !== '')).map((name) => name.replace(/\n/g, ''))
  formattedRedCornerArray.forEach((name, index) => {
    if (index % 2 === 0) mergedArrays.push({ redCornerFighter: `${name} ${formattedRedCornerArray[index + 1]}`, blueCornerFighter: `${formattedBlueCornerArray[index]} ${formattedBlueCornerArray[index + 1]}` })
  })
  return mergedArrays
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

export const scrapeEventsFights = async (fights: IEvent[]) => {
  const fightCard: IEventCard[] = []
  await Promise.all(fights.map(async ({ url, _id }) => {
    let mainCard: IFight[] = []
    let prelimsCard: IFight[] = []
    const html = await fetchPageHtml(url)
    const $ = cheerio.load(html)

    $('.main-card', html).each((_index, element) => {
      const redCornerFighters = $(element).find('.c-listing-fight__corner-name--red').text()
      const blueCornerFighters = $(element).find('.c-listing-fight__corner-name--blue').text()
      mainCard = formatAndMergeFighters(redCornerFighters, blueCornerFighters)
    })

    $('.fight-card-prelims', html).each((_index, element) => {
      const redFighterName = $(element).find('.c-listing-fight__corner-name--red').text()
      const blueFighterName = $(element).find('.c-listing-fight__corner-name--blue').text()
      prelimsCard = formatAndMergeFighters(redFighterName, blueFighterName)
    })
    fightCard.push({ _id, mainCard, prelimsCard })
  }))
  return fightCard
}