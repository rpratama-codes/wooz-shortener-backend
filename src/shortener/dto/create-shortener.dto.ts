import { IsOptional, IsUUID, IsUrl } from 'class-validator';

export class CreateShortenerDto {
  @IsOptional()
  @IsUUID()
  user_uid?: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsUUID()
  session_id?: string | undefined;
}
