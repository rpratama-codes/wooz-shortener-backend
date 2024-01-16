import { UserFromJwt } from './userFromJwt.dto';

export class RefreshDto {
  user: UserFromJwt;
  refreshToken: string;
}
