import { Module } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { PacienteMedicosRelation } from '../relations/entities/pacienteMedico-relation.entity';

@Module({
  controllers: [MedicoController],
  providers: [MedicoService],
  imports: [TypeOrmModule.forFeature([Medico, PacienteMedicosRelation])],
  exports: [TypeOrmModule],
})
export class MedicoModule {}
