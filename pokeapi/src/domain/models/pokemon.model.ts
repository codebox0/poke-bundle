import PokemonNameEmptyException from '../exceptions/pokemon-name-empty.exception';

export default class PokemonModel {
  private id?: string;

  private readonly name: string;

  private readonly description: string;

  private readonly imageUrl: string;

  private createAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    // price: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    // this.price = price || 0;
    this.validateName();
  }

  public validateName(): void {
    if (this.name?.length <= 0) {
      throw new PokemonNameEmptyException(
        'The price pokemon name length should be greater than zero',
      );
    }
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id;
  }

  public setCreateAt(createdAt: Date): this {
    this.createAt = createdAt;
    return this;
  }
}
