import { IsAlpha, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsAlpha()
  @IsOptional()
  first_name?: string;

  @IsAlpha()
  @IsOptional()
  last_name?: string;
}
