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

export interface RedCornerCard {
  redCornerName: string,
  redCornerPhoto?: string
}

export interface BlueCornerCard {
  blueCornerName: string,
  blueCornerPhoto?: string
}

interface Card extends RedCornerCard, BlueCornerCard { }
