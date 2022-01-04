import { NextFunction, Response } from 'express';
import { authenticatedReq } from '../types/authenticatedRequest';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '..';

const unauthenticatedOnly = async (
  req: authenticatedReq,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies.authToken;

  verify(authToken, jwtSecret, (err: any, context: any) => {
    if (context) return res.redirect('/app');
  });

  next();
};

export { unauthenticatedOnly };
