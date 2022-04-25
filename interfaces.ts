export interface IFight {
  title: string,
  url: string,
  date: Date,
  time: string,
  fightNight: boolean
}

export interface FightCard {
  title: string,
  card: Card[]
}

export interface Card {
  redCornerName: string,
  redCornerPhoto: string,
  blueCornerName: string,
  blueCornerPhoto: string
}
