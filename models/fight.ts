import { Schema, model } from 'mongoose';
import { IFight } from '../interfaces';

const FightSchema = new Schema<IFight>({
  _id: Number,
  title: String,
  url: String,
  date: Date,
  time: String,
  fightNight: Boolean,
});

const Fight = model<IFight>('Fight', FightSchema);

export default Fight;
