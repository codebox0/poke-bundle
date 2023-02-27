import { PokemonEntity } from '../../infrastructure/adapters/respository/products/entity/pokemon.entity';

export interface PokemonPaginated extends Pagination {
  items: PokemonEntity[];
  total: number;
}
export interface Database {
  init(): Promise<void>; // Init connection to DB
  findBy(
    // params: { [key: string]: any },
    pagination?: Pagination,
  ): Promise<PokemonPaginated>;
  createUpdatePokemon(
    pokemon: Omit<PokemonEntity, '_id'>,
  ): Promise<PokemonEntity>;
  validateId(value: string): boolean;
}
