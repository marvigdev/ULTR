import { NextFunction, Response } from 'express';
import { authenticatedReq } from '../types/authenticatedRequest';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '..';

const authenticatedOnly = async (
  req: authenticatedReq,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.redirect('/login?clear=true');
  const authToken = authHeader.split(' ')[0];
  if (!authToken) return res.redirect('/login?clear=true');

  verify(authToken, jwtSecret, (err, context) => {
    if (err || !context) return res.redirect('/login?clear=true');

    req.context = {
      name: context.name,
      userId: context.userId,
    };

    next();
  });
};

export { authenticatedOnly };
