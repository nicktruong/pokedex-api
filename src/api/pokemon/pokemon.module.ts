import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  imports: [],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [],
})
export class PokemonModule {}
