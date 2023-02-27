import { SyncServiceParams } from '../../infrastructure/adapters/respository/products/entity/params';
import { PokemonApi } from '../../infrastructure/adapters/respository/products/entity/pokeApi';
import { PokemonEntity } from '../../infrastructure/adapters/respository/products/entity/pokemon.entity';
import { SyncDatabaseApi } from '../ports/actions';
import PokeApi from '../../infrastructure/pokeapi';
import { Database } from '../ports/database';
import { configVar } from '../../config/config-var';

export default class SyncService implements SyncDatabaseApi {
  private offset!: number;
  private limit!: number;
  private pokemonApi: PokeApi;
  private database: Database;
  constructor(params: SyncServiceParams) {
    Object.assign(this, params);
  }

  syncDatabase = async () => {
    const pokemonList = await this.pokemonApi.listPokemon(
      this.offset,
      this.limit,
    );
    const ids = pokemonList.results.map(
      (pokemon) => pokemon.url.split(`${configVar().POKE_API_BASE_URL}`)[1],
    );

    const promisesApi = ids.map((id) => this.pokemonApi.getPokemon(id));
    const pokemonResults = await Promise.allSettled(promisesApi);
    const pokemonApi = this.getFulfilledPromises<PokemonApi>(pokemonResults);

    const promisesDatabase = pokemonApi.map((pokemon) => {
      // const {...rest } = pokemon;
      const pokemonToCreateUpdate: PokemonEntity = {
        ...pokemon,
        createAt: new Date().toISOString(),
        // _externalId: id,
      };

      return this.database.createUpdatePokemon(pokemonToCreateUpdate);
    });

    const databaseResult = await Promise.allSettled(promisesDatabase);
    const pokemonUpdated =
      this.getFulfilledPromises<PokemonEntity>(databaseResult).length;

    return { data: true, pokemonUpdated };
  };

  private getFulfilledPromises = <T>(
    result: PromiseSettledResult<T>[],
  ): T[] => {
    return result.reduce((acc: T[], res) => {
      if (res.status === 'fulfilled') {
        acc.push({ ...res.value });
      }

      return acc;
    }, []);
  };
}
