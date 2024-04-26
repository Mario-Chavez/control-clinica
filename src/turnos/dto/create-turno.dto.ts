import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Medico } from 'src/medico/entities/medico.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';

export class CreateTurnoDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsDateString()
  @IsNotEmpty()
  hour: Date;

  @IsBoolean()
  isConfirmed: boolean;

  @IsUUID()
  medico: Medico;

  @IsUUID()
  paciente: Paciente;
}
