import {
  PokemonApi,
  PokemonsApi,
} from '../adapters/respository/products/entity/pokeApi';

export interface PokemonApiPortal {
  listPokemon(offset: number, limit: number): Promise<PokemonsApi>;
  getPokemon(id: string): Promise<PokemonApi>;
}
