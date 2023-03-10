import { Schema } from 'mongoose';

const PokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  // price: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default PokemonSchema;
