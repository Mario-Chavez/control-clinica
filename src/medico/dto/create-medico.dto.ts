import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
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
  especialty: string;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(8)
  @MinLength(5)
  @IsPositive()
  matricula: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  phone: string;

  @ArrayNotEmpty()
  obrasSociales: string[]; // Array de nombres de obras sociales

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  pacientes?: string[];
}
