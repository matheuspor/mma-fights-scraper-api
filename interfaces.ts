export interface IFight {
  _id: number,
  title: string,
  url: string,
  date: Date,
  time: string,
  fightNight: boolean
}

export interface FightCard {
  fight: number | IFight,
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

export interface Card extends RedCornerCard, BlueCornerCard { }
