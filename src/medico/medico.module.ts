import { Module } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';

@Module({
  controllers: [MedicoController],
  providers: [MedicoService],
  imports: [TypeOrmModule.forFeature([Medico])],
  exports: [TypeOrmModule],
})
export class MedicoModule {}
