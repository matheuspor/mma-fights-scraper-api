import { ObjectId } from 'mongoose';

export interface IFight {
  _id?: ObjectId,
  title: string,
  url: string,
  date: Date,
  time: string,
  fightNight: boolean
}

export interface FightCard {
  fight: ObjectId | any,
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
