import { Injectable, Inject } from '@nestjs/common';
import PokemonModel from '../../../domain/models/pokemon.model';
import { PokemonRepository } from '../../../domain/ports/pokemon.repository';
import PokeApi from '../../../infrastructure/pokeapi';
import PokemonService from '../../../domain/services/pokemon';
import { configVar } from '../../../config/config-var';

@Injectable()
export default class GetAllPokemonsUsecase {
  constructor(
    @Inject('PokemonRepository') private productRepository: PokemonRepository,
    private pokemonApi: PokeApi, // private pokemonService: PokemonService,
  ) {}

  public async handler(pagination?: Pagination): Promise<PokemonModel[]> {
    const pokemonList = await this.productRepository.getAll(pagination);
    console.log('results-pokemons : ', pokemonList);

    if (pokemonList.length <= pagination.itemsPerPage) {
      const results = await this.pokemonApi.listPokemon(
        pagination.page,
        pagination.itemsPerPage,
      );
      const pokemons = [];
      console.log('results-jfhj : ', results);

      for (const pokemon of results.results) {
        const pokemonData = await this.pokemonApi.getPokemon(
          pokemon.url.split(`${configVar().POKE_API_BASE_URL}`)[1],
        );
        console.log('pokemonData-jfhj pokemondata : ', pokemonData);
        pokemons.push(
          await this.productRepository.createPokemon(
            new PokemonModel(
              pokemonData.id.toString(),
              pokemonData.name,
              pokemonData.name,
              // @ts-ignore
              pokemonData.sprites.other.home.front_default,
            ),
          ),
        );
        console.log('results- create list : ', results);
      }
      console.log('results non create : ', results);
      return pokemons;
    }
    // const results = await this.pokemonApi.listPokemon();

    // console.log('results-jfhj : ', pokemons);
    console.log('results-pokemons : ', pokemonList);

    return this.productRepository.getAll();
  }
}
