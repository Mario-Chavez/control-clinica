import { Module } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { MedicoModule } from 'src/medico/medico.module';

@Module({
  controllers: [PacienteController],
  providers: [PacienteService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Paciente]), MedicoModule],
  exports: [TypeOrmModule],
})
export class PacienteModule {}
