import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import PokemonCommand from '../../application/commands/pokemon.command';
import GetAllPokemonsUsecase from '../../application/usecases/pokemons/getAllPokemons.usecase';
import GetPokemonUsecase from '../../application/usecases/pokemons/getPokemon.usecase';
import CreatePokemonUsecase from '../../application/usecases/pokemons/createPokemon.usecase';
import DeletePokemonUsecase from '../../application/usecases/pokemons/deletePokemon.usecase';
import UpdatePokemonUsecase from '../../application/usecases/pokemons/updatePokemon.usecase';
import Product from '../../domain/models/pokemon.model';

@Controller('pokemons')
export default class PokemonController {
  constructor(
    private getAllPokemonsUseCase: GetAllPokemonsUsecase,
    private readonly getPokemonUseCase: GetPokemonUsecase,
    private readonly createPokemonUseCase: CreatePokemonUsecase,
    private readonly deletePokemonUseCase: DeletePokemonUsecase,
    private readonly updatePokemonUseCase: UpdatePokemonUsecase,
  ) {}

  @Get('/:offset/:limit')
  public async getPokemons(
    @Res() request,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
  ): Promise<any> {

    console.log('results- offset : ', offset);
    console.log('results- limit : ', limit);
    const pokemons = await this.getAllPokemonsUseCase.handler({
      page: offset,
      itemsPerPage: limit,
    });

    return request.status(HttpStatus.OK).json(pokemons);
  }

  @Get(':id')
  public async getPokemon(
    @Res() request,
    @Param('id') id: string,
  ): Promise<any> {
    const product = await this.getPokemonUseCase.handler(id);
    return request.status(HttpStatus.OK).json(product);
  }

  @Post()
  public async createPokemon(
    @Res() request,
    @Body() product: PokemonCommand,
  ): Promise<any> {
    const productCreated = await this.createPokemonUseCase.handler(product);
    return request.status(HttpStatus.CREATED).json(productCreated);
  }

  @Delete(':id')
  public async deletePokemon(
    @Res() request,
    @Param('id') id: string,
  ): Promise<any> {
    const product = await this.deletePokemonUseCase.handler(id);
    return request.status(HttpStatus.OK).json(product);
  }

  @Put(':id')
  public async updatePokemon(
    @Res() request,
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<any> {
    const productUpdated = await this.updatePokemonUseCase.handler(id, product);
    return request.status(HttpStatus.OK).json(productUpdated);
  }
}
