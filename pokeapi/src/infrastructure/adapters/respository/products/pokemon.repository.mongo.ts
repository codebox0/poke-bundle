import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import PokemonModel from '../../../../domain/models/pokemon.model';
import { PokemonEntity } from './entity/pokemon.entity';
import { Optional } from 'typescript-optional';
import PokemonMapper from '../../../mapper/pokemon.mapper';
import { PokemonRepository } from '../../../../domain/ports/pokemon.repository';

@Injectable()
export default class PokemonRepositoryMongo implements PokemonRepository {
  constructor(
    @InjectModel('Pokemon')
    private readonly pokemonEntityModel: Model<PokemonEntity>,
  ) {}

  public async getAll(pagination?: Pagination): Promise<PokemonModel[]> {
    const pokemons = await this.pokemonEntityModel
      .find()
      .limit(pagination?.itemsPerPage)
      .skip(pagination?.itemsPerPage * ((pagination?.page || 1) ));
    // .lean();
    return PokemonMapper.toDomains(pokemons);
  }

  public async createPokemon(
    pokemon: PokemonModel,
  ): Promise<Optional<PokemonModel>> {
    let pokemonCreated = new this.pokemonEntityModel(pokemon);
    pokemonCreated = await pokemonCreated.save();
    return PokemonMapper.toDomain(pokemonCreated);
  }

  public async getPokemon(pokemonId: string): Promise<Optional<PokemonModel>> {
    const pokemon = await this.pokemonEntityModel.findById(pokemonId);
    return PokemonMapper.toDomain(pokemon);
  }

  public async deletePokemon(
    pokemonId: string,
  ): Promise<Optional<PokemonModel>> {
    const pokemonDeleted = await this.pokemonEntityModel.findByIdAndDelete(
      pokemonId,
    );
    return PokemonMapper.toDomain(pokemonDeleted);
  }

  public async updatePokemon(
    pokemonId: string,
    pokemon: PokemonModel,
  ): Promise<Optional<PokemonModel>> {
    const pokemonUpdated = await this.pokemonEntityModel.findByIdAndUpdate(
      pokemonId,
      pokemon,
      { new: true },
    );
    return PokemonMapper.toDomain(pokemonUpdated);
  }
}
