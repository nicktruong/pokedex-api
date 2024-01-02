import { ApiProperty } from '@nestjs/swagger';

export class GotPokemonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  imgSrc: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  types: string[];
}

class GotPokemonPaginationDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  next: string;

  @ApiProperty()
  previous: string;
}

export class GotPokemonPaginationMetadataDto extends GotPokemonPaginationDto {
  @ApiProperty()
  results: { name: string; url: string }[];
}

export class GotPokemonPaginationResultDto extends GotPokemonPaginationDto {
  @ApiProperty({ isArray: true })
  results: GotPokemonDto[];
}
