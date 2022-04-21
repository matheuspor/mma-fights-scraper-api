import { Schema, model } from 'mongoose';
import { Fight } from '../interfaces'

const FightSchema = new Schema<Fight>({
  title: String,
  url: String,
  date: Date,
  time: String,
  fightNight: Boolean
})

const Fight = model<Fight>('Fight', FightSchema);

export default Fight;