import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';
import { GotPokemonPaginationResultDto } from './dto';
import { UserRole } from '@/common/enums';

export default {
  index: 'pokemons',
  getPagination: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    roles: [UserRole.CUSTOMER],
    jwtSecure: true,
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
