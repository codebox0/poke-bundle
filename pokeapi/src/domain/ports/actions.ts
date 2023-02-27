import { PokemonPaginated } from './database';
import { PokemonEntity } from '../../infrastructure/adapters/respository/products/entity/pokemon.entity';
import {GetPokemonParam, PathParams} from "../../infrastructure/adapters/respository/products/entity/params";
export interface SyncDatabaseApi {
  syncDatabase(
    offset: number,
    limit: number,
  ): Promise<{ [key: string]: string | number | boolean }>;
}

export interface PokemonActions {
  listPokemon(params: PathParams): Promise<PokemonPaginated>;
  getPokemon(params: GetPokemonParam): Promise<PokemonEntity>;
  updatePokemon(body: Body, params: GetPokemonParam): Promise<boolean>;
}
