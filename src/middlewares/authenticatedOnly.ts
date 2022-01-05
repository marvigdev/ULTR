import { NextFunction, Response } from 'express';
import { authenticatedReq } from '../types/authenticatedRequest';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '..';

const authenticatedOnly = async (
  req: authenticatedReq,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies.authToken;

  verify(authToken, jwtSecret, (err: any, context: any) => {
    if (err) return res.redirect('/login');

    req.context = {
      username: context.username,
      userId: context.userId,
    };

    next();
  });
};

export { authenticatedOnly };
