import CreatePokemonUsecase from './createPokemon.usecase';
import DeletePokemonUsecase from './deletePokemon.usecase';
import GetAllPokemonsUsecase from './getAllPokemons.usecase';
import GetPokemonUsecase from './getPokemon.usecase';
import UpdatePokemonUsecase from './updatePokemon.usecase';

export const POKEMON_USECASES = [
  CreatePokemonUsecase,
  DeletePokemonUsecase,
  GetAllPokemonsUsecase,
  GetPokemonUsecase,
  UpdatePokemonUsecase,
];
