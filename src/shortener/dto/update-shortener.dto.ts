import { IsString } from 'class-validator';

export class UpdateShortenerDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;
}
