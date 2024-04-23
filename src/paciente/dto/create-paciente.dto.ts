import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

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

  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: 'The obraSocial must be between 2 and 10 characters ',
  })
  @MaxLength(10, {
    message: 'The obraSocial must be between 2 and 10 characters ',
  })
  obraSocial: string;

  @IsIn(['user', 'admin'], {
    message: 'The roles must be user or admin',
  })
  roles?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  medicos?: string[];
}
