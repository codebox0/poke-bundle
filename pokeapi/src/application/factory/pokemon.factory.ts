/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import Product from '../../domain/models/pokemon.model';
import PokemonCommand from '../commands/pokemon.command';

@Injectable()
export default class PokemonFactory {
  public createPokemon(pokemonCommand: PokemonCommand): Product {
    return new Product(
      '',
      pokemonCommand.name,
      pokemonCommand.description,
      pokemonCommand.imageUrl,
      // pokemonCommand.price,
    );
  }
}
