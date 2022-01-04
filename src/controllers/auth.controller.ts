import { Request, Response } from 'express';
import { userService } from '../services/User.services';

const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserByUsername(req.body.username);
      await userService.passwordMatch(user, req.body.password);
      const jwtToken = await userService.generateJwt(user);
      return res.redirect(`/app?token=${jwtToken}`);
    } catch (err: any) {
      return res.render('login', {
        error: err.message,
      });
    }
  },
};

export { authController };
