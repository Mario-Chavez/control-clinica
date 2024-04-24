import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from 'src/medico/entities/medico.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [ConfigModule, TypeOrmModule.forFeature([Paciente, Medico])],
})
export class RelationsModule {}
