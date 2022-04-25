import { Schema, model } from 'mongoose';
import { FightCard } from '../interfaces';

const FightsCardSchema = new Schema<FightCard>({
  title: String,
  card: Array,
});

const FightsCard = model<FightCard>('FightsCard', FightsCardSchema);

export default FightsCard;
