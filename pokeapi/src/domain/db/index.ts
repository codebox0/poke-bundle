import { Database, PokemonPaginated } from '../ports/database';
import { PokemonEntity } from '../../infrastructure/adapters/respository/products/entity/pokemon.entity';
import { Model } from 'mongoose';

export default class Mongo implements Database {
  init(): Promise<void> {
    return Promise.resolve(undefined);
  }
  createUpdatePokemon(
    pokemon: Omit<PokemonEntity, '_id'>,
  ): Promise<PokemonEntity> {
    return Promise.resolve(undefined);
  }

  async findBy(pagination?: Pagination): Promise<PokemonPaginated> {
    const pokemonEntityModel: Model<PokemonEntity> = new Model<PokemonEntity>();

    const pokemonDocuments = (await pokemonEntityModel
      .find({})
      .limit(pagination.itemsPerPage)
      .skip(pagination.itemsPerPage * (pagination.page))
      .lean()) as PokemonEntity[];
    return Promise.resolve({
      items: pokemonDocuments,
      total: pokemonDocuments.length,
    });
  }

  validateId(value: string): boolean {
    return false;
  }
}
