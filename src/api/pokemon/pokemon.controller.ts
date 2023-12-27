import { Query } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import pokemonRoutes from './pokemon.routes';
import { PokemonService } from './pokemon.service';

import type { GotPokemonPaginationResultDto } from './dto';
import { ApiQuery } from '@nestjs/swagger';
import { IntConstraintPipe } from '@/pipes/int-constraint.pipe';

@InjectController({ name: pokemonRoutes.index })
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @InjectRoute(pokemonRoutes.getPagination)
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  public async getPagination(
    @Query('limit', new IntConstraintPipe({ min: 1, max: 100 })) limit: number,
    @Query('offset', new IntConstraintPipe({ min: 0 })) offset: number,
  ): Promise<GotPokemonPaginationResultDto> {
    const results = await this.pokemonService.getPagination({ limit, offset });
    return results;
  }
}
