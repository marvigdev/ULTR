import { Request, Response } from 'express';
import { renderView } from '../views/renderView';

const authController = {
  login: async (req: Request, res: Response) => {
    return res.send('Login!');
  },
};

export { authController };
