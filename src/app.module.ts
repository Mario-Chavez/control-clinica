import { Module } from '@nestjs/common';
import { PacienteModule } from './paciente/paciente.module';
import { MedicoModule } from './medico/medico.module';
import { AdministradorModule } from './administrador/administrador.module';
import { TurnoModule } from './turno/turno.module';
import { HistoriaclinicaModule } from './historiaclinica/historiaclinica.module';

@Module({
  imports: [PacienteModule, MedicoModule, AdministradorModule, TurnoModule, HistoriaclinicaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
