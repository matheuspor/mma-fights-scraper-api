export interface IEvent {
  _id: number,
  title: string,
  url: string,
  date: Date,
  time: string,
  fightNight: boolean
}

export interface IFightCard {
  event: number | IEvent,
  fights: IFight[]
}

export interface IRedCornerFighter {
  redCornerFighter: string
}

export interface IBlueCornerFighter {
  blueCornerFighter: string
}

export interface IFight extends IRedCornerFighter, IBlueCornerFighter { }
