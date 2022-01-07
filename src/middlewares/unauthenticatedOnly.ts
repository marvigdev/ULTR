import { NextFunction, Response } from 'express';
import { authenticatedReq } from '../types/authenticatedRequest';
import { verifyJWT } from '../services/JWT.service';
import { JWTContext } from '../types/JWTContext';

const unauthenticatedOnly = async (
  req: authenticatedReq,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies.authToken;

  try {
    verifyJWT<JWTContext>(authToken);
    return res.redirect('/app');
  } catch (err: any) {
    return next();
  }
};

export { unauthenticatedOnly };
