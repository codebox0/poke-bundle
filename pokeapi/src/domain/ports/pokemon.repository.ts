import PokemonModel from '../models/pokemon.model';
import { Optional } from 'typescript-optional';

export interface PokemonRepository {
  /**
   *
   */
  getAll(pagination?: Pagination): Promise<PokemonModel[]>;

  /**
   * Returns product filtered by id
   * @param {string} pokemontId
   * @returns a `Pokémon` object containing the data.
   */
  getPokemon(id: string): Promise<Optional<PokemonModel>>;

  /**
   *
   */
  createPokemon(pokemon: PokemonModel): Promise<Optional<PokemonModel>>;

  /**
   *
   */
  deletePokemon(pokemonId: string): Promise<Optional<PokemonModel>>;

  /**
   *
   */
  updatePokemon(
    pokemonId: string,
    pokemon: PokemonModel,
  ): Promise<Optional<PokemonModel>>;
}
