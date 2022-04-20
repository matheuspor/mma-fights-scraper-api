export interface Fight {
  title: string,
  url: string,
  date: Date,
  time: string,
  fightNight: boolean
}

export interface FightCard {
  title: string,
  card: unknown[]
}