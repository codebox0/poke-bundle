import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { PokemonApiPortal } from './pokemon';
import {
  PokemonApi,
  PokemonsApi,
} from '../adapters/respository/products/entity/pokeApi';
import { configVar } from '../../config/config-var';

@Injectable()
export default class PokeApi implements PokemonApiPortal {
  constructor(private http: HttpService) {}
  async listPokemon(offset = 0, limit = 10): Promise<PokemonsApi> {
    const pokemons = await lastValueFrom(
      this.http
        .get<PokemonsApi>(
          `${configVar().POKE_API_BASE_URL}?offset=${offset}&limit=${limit}`,
        )
        .pipe(
          map((res) => res),
          map((results) => {
            console.log('results : ', results);

            return results.data;
          }),
        )
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        ),
    );

    return pokemons;
  }


  // async getPokemon(id: string): Promise<PokemonApi> {
  async getPokemon(id: string): Promise<PokemonApi> {
    return this.http
      .get(`${configVar().POKE_API_BASE_URL}${id}`)
      .toPromise()
      .then((res) => {
        console.log('res : ', res);
        return res.data;
      });
    //  throw new Error('Method not implemented.');
  }
}
