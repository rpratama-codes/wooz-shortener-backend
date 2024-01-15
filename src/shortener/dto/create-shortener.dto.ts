import { IsBoolean, IsOptional, IsUUID, IsUrl } from 'class-validator';

export class CreateShortenerDto {
  @IsOptional()
  @IsUUID()
  user_uid?: string;

  @IsBoolean()
  guest: boolean;

  @IsUrl()
  url: string;
}
