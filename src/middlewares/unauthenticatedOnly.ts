import { NextFunction, Response } from 'express';
import { authenticatedReq } from '../types/authenticatedRequest';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '..';

const unauthenticatedOnly = async (
  req: authenticatedReq,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();
  const authToken = authHeader.split(' ')[0];

  verify(authToken, jwtSecret, (err, context) => {
    if (!err) return res.redirect('/app');
  });

  req.context = {};
  next();
};

export { unauthenticatedOnly };
