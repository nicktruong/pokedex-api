import { ApiProperty } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';
import { ActionedBaseDto } from '@/common/dto';
import { UserRole } from '@/common/enums';

class GotCustomerSessionDto extends ActionedBaseDto {}

export class GotCustomerDto extends ActionedBaseDto {
  @ApiProperty({
    enum: UserRole,
    default: enumh.getFirstKey<typeof UserRole>(UserRole),
  })
  role: UserRole;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ example: 'Lorem' })
  name: string;
}

export class GotCustomerDetailDto extends GotCustomerDto {
  @ApiProperty({ isArray: true })
  sessions: GotCustomerSessionDto[];
}
