import { Schema, model, Document } from 'mongoose';
import { FightCard } from '../interfaces';

interface FightDocument extends FightCard, Document { }

const FightsCardSchema = new Schema<FightDocument>({
  fight: { type: Schema.Types.ObjectId, ref: 'Fight' },
  card: Array,
});

const FightsCard = model<FightCard>('FightsCard', FightsCardSchema);

export default FightsCard;
