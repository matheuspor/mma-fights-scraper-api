import { Schema, model, Document } from 'mongoose';
import { IFightCard } from '../interfaces';

interface FightDocument extends IFightCard, Document { }

const FightsCardSchema = new Schema<FightDocument>({
  event: { type: Schema.Types.Number, ref: 'Event' },
  fights: Array,
});

const FightsCard = model<IFightCard>('FightsCard', FightsCardSchema);

export default FightsCard;
