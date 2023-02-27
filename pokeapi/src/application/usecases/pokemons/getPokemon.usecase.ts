import { Injectable, Inject } from '@nestjs/common';
import Product from '../../../domain/models/pokemon.model';
import { PokemonRepository } from '../../../domain/ports/pokemon.repository';
import { Optional } from 'typescript-optional';

@Injectable()
export default class GetPokemonUsecase {
  constructor(
    @Inject('PokemonRepository') private productRepository: PokemonRepository,
  ) {}

  public handler(productId: string): Promise<Optional<Product>> {
    return this.productRepository.getPokemon(productId);
  }
}
