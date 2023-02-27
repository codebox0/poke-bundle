import { Document } from 'mongoose';

export interface PokemonEntity extends Document {
  name: string;
  readonly description: string;
  readonly imageUrl: string;
  // readonly price: number;
  readonly createAt: string;
}
