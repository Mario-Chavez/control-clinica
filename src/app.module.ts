import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PacienteModule } from './paciente/paciente.module';
import { MedicoModule } from './medico/medico.module';
import { AdministradorModule } from './administrador/administrador.module';
import { TurnoModule } from './turno/turno.module';
import { HistoriaclinicaModule } from './historiaclinica/historiaclinica.module';
import { RelationsModule } from './relations/relations.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //para usar las variables de entorno
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PacienteModule,
    MedicoModule,
    AdministradorModule,
    TurnoModule,
    HistoriaclinicaModule,
    RelationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
