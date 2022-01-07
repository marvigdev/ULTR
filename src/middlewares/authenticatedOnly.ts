import { NextFunction, Response } from 'express';
import { authenticatedReq } from '../types/authenticatedRequest';
import { verifyJWT } from '../services/JWT.service';
import { JWTContext } from '../types/JWTContext';

const authenticatedOnly = async (
  req: authenticatedReq,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies.authToken;

  try {
    const decodedPayload = verifyJWT<JWTContext>(authToken);
    req.context = {
      username: decodedPayload.username,
      userId: decodedPayload.userId,
    };
  } catch (err: any) {
    return res.redirect('/login');
  }

  next();
};

export { authenticatedOnly };
