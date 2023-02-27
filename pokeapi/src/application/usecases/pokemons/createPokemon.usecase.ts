import { Injectable, Inject } from '@nestjs/common';
import Product from '../../../domain/models/pokemon.model';
import { PokemonRepository } from '../../../domain/ports/pokemon.repository';
import { Optional } from 'typescript-optional';
import PokemonCommand from '../../commands/pokemon.command';
import PokemonFactory from '../../factory/pokemon.factory';

@Injectable()
export default class CreatePokemonUsecase {
  constructor(
    @Inject('PokemonRepository') private productRepository: PokemonRepository,
    private productFactory: PokemonFactory,
  ) {}

  public handler(productCommand: PokemonCommand): Promise<Optional<Product>> {
    const product = this.productFactory.createPokemon(productCommand);
    return this.productRepository.createPokemon(product);
  }
}
