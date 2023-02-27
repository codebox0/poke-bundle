import { Optional } from 'typescript-optional';
import Pokemon from '../../domain/models/pokemon.model';
import { PokemonEntity } from '../adapters/respository/products/entity/pokemon.entity';
import PokemonModel from '../../domain/models/pokemon.model';

export default class PokemonMapper {
  public static toDomain(pokemonEntity: PokemonEntity): Optional<PokemonModel> {
    if (!pokemonEntity) {
      return Optional.empty<PokemonModel>();
    }
    const product = new PokemonModel(
      pokemonEntity.id,
      pokemonEntity.name,
      pokemonEntity.description,
      pokemonEntity.imageUrl,
      // pokemonEntity.price,
    );

    product.setCreateAt(new Date(pokemonEntity.createAt));
    return Optional.of(product);
  }

  public static toDomains(productsEntity: PokemonEntity[]): PokemonModel[] {
    const pokemons = new Array<PokemonModel>();
    productsEntity.forEach((productEntity) => {
      const pokemon = this.toDomain(productEntity);
      pokemons.push(pokemon.get());
    });
    return pokemons;
  }
}
