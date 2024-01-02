import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';
import { GotPokemonPaginationResultDto } from './dto';

export default {
  index: 'pokemons',
  getPagination: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    jwtSecure: false,
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.OK,
          type: GotPokemonPaginationResultDto,
          isArray: true,
        },
      ],
    },
  },
};
