import { Request } from 'express'

export interface IEvent {
  _id: number,
  title: string,
  url: string,
  date: Date,
  time: string,
  fightNight: boolean
}

export interface IFightCard {
  event: number,
  fights: IFight[]
}

export interface IRedCornerFighter {
  redCornerFighter: string
}

export interface IBlueCornerFighter {
  blueCornerFighter: string
}

export interface IFight extends IRedCornerFighter, IBlueCornerFighter { }

export interface ExtendedRequest extends Request {
  events?: IEvent[],
  eventsFights?: IFightCard[]
}
