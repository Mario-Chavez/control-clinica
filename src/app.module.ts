import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PacienteModule } from './paciente/paciente.module';
import { MedicoModule } from './medico/medico.module';
import { AdministradorModule } from './administrador/administrador.module';
import { RelationsModule } from './relations/relations.module';
import { TurnosModule } from './turnos/turnos.module';

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
    RelationsModule,
    TurnosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
