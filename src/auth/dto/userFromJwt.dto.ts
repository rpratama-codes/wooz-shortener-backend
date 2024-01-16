import { UserTypes } from '../entities';
import { Roletype } from './role.dto';

export class UserFromJwt {
  sub: string;
  user_type: UserTypes;
  role: Roletype;
  iat: number;
  exp: number;
}
