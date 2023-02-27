// import { ApiError, Ports } from '@entities/common';
import { PokemonActions } from '../ports/actions';
import { PokemonEntity } from '../../infrastructure/adapters/respository/products/entity/pokemon.entity';
import {
  GetPokemonParam,
  PathParams,
} from '../../infrastructure/adapters/respository/products/entity/params';
import { Database } from '../ports/database';
import { ApiError } from '../exceptions/apiError';
import Mongo from "../db";

export default class PokemonService implements PokemonActions {
  private page: number;
  private itemsPerPage: number;
  private database: Mongo;
  // private Ports:Ports
  constructor({ page = 1, itemsPerPage = 10 }) {
    this.page = page;
    this.itemsPerPage = itemsPerPage;
    // this.Ports = Ports;
  }

  listPokemon = async (filter: PathParams = {}) => {
    return this.database.findBy({
      // page: Number(this.page),
      // itemsPerPage: Number(this.itemsPerPage),
      page: Number(filter.page),
      itemsPerPage: Number(filter.itemsPerPage),
    });
  };

  getPokemon = async ({ value }: GetPokemonParam): Promise<PokemonEntity> => {
    const key = this.database.validateId(value) ? '_id' : 'name';
    const result = await this.database.findBy({});

    if (result.items.length === 0)
      throw new ApiError(
        'notFound',
        'notFound',
        `Pokemon with ${value} not found`,
      );

    return result.items[0];
  };

  updatePokemon = async (
    body: Body,
    { value }: GetPokemonParam,
  ): Promise<boolean> => {
    if (!this.database.validateId(value))
      throw new ApiError(
        'validations',
        'validations',
        `${value} is not a valid ID`,
      );

    const pokemon = await this.getPokemon({ value });
    const pokemonToCreateUpdate = {
      ...pokemon,
    } as PokemonEntity;

    await this.database.createUpdatePokemon(pokemonToCreateUpdate);

    return true;
  };
}
