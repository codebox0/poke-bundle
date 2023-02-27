import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationModule } from '../application/application.module';
import PokemonSchema from './adapters/respository/products/schema/pokemon.schema';
import PokemonController from './controllers/pokemon.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from '../config/env.enum';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ApplicationModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get(Configuration.MONGO_CONNECTION_STRING)}`,
      }),
    }),
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
  ],
  controllers: [PokemonController],
})
export class InfrastructureModule {}
