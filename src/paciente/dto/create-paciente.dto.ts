import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PacienteMedicosRelation } from '../../relations/entities/pacienteMedico-relation.entity';

export class CreatePacienteDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  fullName: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'The password must be between 6 and 12 characters ',
  })
  @MaxLength(12, {
    message: 'The password must be between 6 and 12 characters',
  })
  @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])\S*$/, {
    message:
      'The password must have an Uppercase letter, a lowercase letter, and a number. No spaces allowed.',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'The obraSocial must be between 2 and 10 characters ',
  })
  @MaxLength(10, {
    message: 'The obraSocial must be between 2 and 10 characters ',
  })
  obraSocial: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  numAfiliado: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsIn(['user', 'admin', 'doctor'], {
    each: true,
    message: 'Each role must be user or admin',
  })
  @IsOptional()
  roles?: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  historialMedico?: string[];

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsArray()
  @IsOptional()
  medicosIncludes?: PacienteMedicosRelation[];
}
