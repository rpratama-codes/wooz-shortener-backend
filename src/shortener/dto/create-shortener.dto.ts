import { IsBoolean, IsUrl } from 'class-validator';

export class CreateShortenerDto {
  @IsBoolean()
  guest: boolean;

  @IsUrl()
  url: string;
}
