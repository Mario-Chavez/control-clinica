import {
  IsEmail,
  IsNotEmpty,
  IsString,
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
  @IsString()
  birthdate: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  adress: string;

  @IsString()
  @MaxLength(11)
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'The password must be between 6 and 12 characters ',
  })
  @MaxLength(12, {
    message: 'The password must be between 6 and 12 characters',
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
}
