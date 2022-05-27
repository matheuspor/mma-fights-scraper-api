import { Schema, model } from 'mongoose';
import { IEvent } from '../interfaces';

const EventSchema = new Schema<IEvent>({
  _id: Number,
  title: String,
  url: String,
  date: Date,
  time: String,
  fightNight: Boolean,
});

const Event = model<IEvent>('Event', EventSchema);

export default Event;
