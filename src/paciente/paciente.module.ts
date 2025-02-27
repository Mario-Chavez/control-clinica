import { Module } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { PacienteMedicosRelation } from 'src/relations/entities/pacienteMedico-relation.entity';
import { Turno } from 'src/turnos/entities/turno.entity';

@Module({
  controllers: [PacienteController],
  providers: [PacienteService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Paciente, PacienteMedicosRelation, Turno]),
  ],
  exports: [TypeOrmModule],
})
export class PacienteModule {}
