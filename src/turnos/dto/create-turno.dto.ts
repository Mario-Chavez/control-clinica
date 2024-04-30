import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { Medico } from 'src/medico/entities/medico.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';

export class CreateTurnoDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/) // // Validar el formato de hora (HH:mm)
  hour: string;

  @IsBoolean()
  isConfirmed: boolean;

  @IsUUID()
  medicoId: Medico;

  @IsUUID()
  pacienteId: Paciente;
}
