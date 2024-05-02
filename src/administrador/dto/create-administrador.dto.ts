import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAdministradorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40, {
    message: 'The name must be less than 40 characters',
  })
  @MinLength(3, {
    message: 'The name must be more than 3 characters',
  })
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
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

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsIn(['user', 'admin', 'doctor'], {
    each: true,
    message: 'Each role must be user , admin or doctor',
  })
  roles: string[];
}
