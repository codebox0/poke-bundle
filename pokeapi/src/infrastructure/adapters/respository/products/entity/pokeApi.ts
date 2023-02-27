import { PokemonEntity } from './pokemon.entity';

export interface PokemonApi extends Omit<PokemonEntity, 'createAt'> {
  types: Type[];
  id: number;
}

export interface Localizable {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: Localizable;
}

export interface PokemonsApi {
  count: number;
  next: string;
  previous: null;
  results: Localizable[];
}
