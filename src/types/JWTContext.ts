import { JwtPayload } from 'jsonwebtoken';

export interface JWTContext extends JwtPayload {
  username: string;
  userId: string;
}
