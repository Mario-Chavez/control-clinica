import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
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

export class CreateMedicoDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
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
  @MinLength(3)
  @MaxLength(40)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @MinLength(3)
  especialty: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  matricula: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  phone: string;

  @ArrayNotEmpty()
  obrasSociales: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsIn(['user', 'admin', 'doctor'], {
    each: true,
    message: 'Each role must be user or admin',
  })
  roles: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  pacientes?: string[];
}
