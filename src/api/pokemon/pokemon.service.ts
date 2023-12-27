import { Injectable } from '@nestjs/common';

import type {
  GotPokemonDto,
  GotPokemonPaginationMetadataDto,
  GotPokemonPaginationResultDto,
  PaginationQueryDto,
} from './dto';

@Injectable()
export class PokemonService {
  public async getPagination({
    limit = 12,
    offset = 0,
  }: PaginationQueryDto): Promise<GotPokemonPaginationResultDto> {
    const {
      count,
      next,
      previous,
      results: urlsMeta,
    }: GotPokemonPaginationMetadataDto = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
    ).then((res) => res.json());

    const results: GotPokemonDto[] = await Promise.all(
      urlsMeta.map(({ url }) =>
        fetch(url)
          .then((res) => res.json())
          .then((data) => ({
            name: data.name,
            imgSrc: data.sprites.other.dream_world.front_default,
            id: data.id,
            type: data.types.map(({ type }) => type.name),
          })),
      ),
    );

    return { count, next, previous, results };
  }
}
