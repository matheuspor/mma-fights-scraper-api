export interface IEvent {
  _id: number,
  title: string,
  url: string,
  date: Date,
  time: string,
  event: string
}

export interface IEventCard {
  _id: number,
  mainCard: IFight[],
  prelimsCard: IFight[]
}

export interface IRedCornerFighter {
  redCornerFighter: string
}

export interface IBlueCornerFighter {
  blueCornerFighter: string
}

export interface IFight extends IRedCornerFighter, IBlueCornerFighter { }

export interface IScrapedData {
  events: IEvent[],
  eventCard: IEventCard[]
}
