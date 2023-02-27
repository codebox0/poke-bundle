/* eslint-disable @typescript-eslint/no-useless-constructor */
export default class PokemonNameEmptyException extends Error {
  constructor(message: string) {
    super(message);
  }
}
