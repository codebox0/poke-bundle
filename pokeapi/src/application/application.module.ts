import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainModule } from 'src/domain/domain.module';
import PokemonRepositoryMongo from '../infrastructure/adapters/respository/products/pokemon.repository.mongo';
import PokemonSchema from '../infrastructure/adapters/respository/products/schema/pokemon.schema';
import PokemonFactory from './factory/pokemon.factory';
import { POKEMON_USECASES } from './usecases/pokemons';
import PokeApi from '../infrastructure/pokeapi';
import { HttpModule } from '@nestjs/axios';
import PokemonService from "../domain/services/pokemon";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    DomainModule,
    MongooseModule.forFeature([
      {
        name: 'Pokemon',
        schema: PokemonSchema,
      },
    ]),
  ],
  providers: [
    PokemonFactory,
    ...POKEMON_USECASES,
    { provide: 'PokemonRepository', useClass: PokemonRepositoryMongo },
    PokeApi,
    // PokemonService,
  ],
  exports: [PokemonFactory, ...POKEMON_USECASES],
})
export class ApplicationModule {}
