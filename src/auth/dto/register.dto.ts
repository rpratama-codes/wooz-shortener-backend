import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsAlpha()
  first_name?: string;

  @IsOptional()
  @IsAlpha()
  last_name?: string;
}
