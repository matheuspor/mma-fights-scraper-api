import axios from 'axios'
import * as cheerio from 'cheerio'
import { IBlueCornerFighter, IFightCard, IEvent, IRedCornerFighter } from '../interfaces'

const eventsUrl = 'https://www.ufc.com.br/events'
const mainUrl = 'https://www.ufc.com'

export const fetchPageHtml = (url: string) => axios.get(url)
  .then((response) => response.data)

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
  const fightCard: IFightCard[] = []
  await Promise.all(fights.map(async ({ url, _id }) => {
    const redCornerFighterName: IRedCornerFighter[] = []
    const blueCornerFighterName: IBlueCornerFighter[] = []
    const html = await fetchPageHtml(url)
    const $ = cheerio.load(html)

    // Reads page left side scraping the red corner fighter name
    $('.c-listing-fight__corner--red', html).each((_index, element) => {
      const fighterName = $(element).find('.c-listing-fight__corner-name').text()
      const trimmedFighterName = fighterName.split(' ').filter((name) => (name !== '\n' && name !== ''))
      const fighterFullName = trimmedFighterName.map((name) => name.replace('\n', '')).join(' ')
      redCornerFighterName.push({ redCornerFighter: `${fighterFullName}` })
    })

    // Reads page right side scraping the blue corner fighter name
    $('.c-listing-fight__corner--blue', html).each((_index, element) => {
      const fighterName = $(element).find('.c-listing-fight__corner-name').text()
      const trimmedFighterName = fighterName.split(' ').filter((name) => (name !== '\n' && name !== ''))
      const fighterFullName = trimmedFighterName.map((name) => name.replace('\n', '')).join(' ')
      blueCornerFighterName.push({ blueCornerFighter: `${fighterFullName}` })
    })

    // Merge both arrays of fighters data
    const mergedArrays = redCornerFighterName.map(({ redCornerFighter }, index) => {
      const { blueCornerFighter } = blueCornerFighterName[index]
      return { redCornerFighter, blueCornerFighter }
    })

    // Push new object with the title fight and a card array with all fights in the same day 
    fightCard.push({ _id, fights: mergedArrays })
  }))
  return fightCard
}