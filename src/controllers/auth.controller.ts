import { Request, Response } from 'express';
import { userService } from '../services/User.services';

const authController = {
  login: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const user = await userService.getUserByUsername(req.body.username);
      await userService.passwordMatch(user, req.body.password);
      const jwtToken = await userService.generateJwt(user);
      await userService.setToken(res, jwtToken);
      return res.redirect(`/app`);
    } catch (err: any) {
      return res.render('login', {
        error: err.message,
      });
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const { username, password, confirmPassword } = req.body;
      await userService.createUser(username, password, confirmPassword);
      res.render('register', {
        message: 'You created an account! You can login now.',
      });
    } catch (err: any) {
      return res.render('register', {
        error: err.message,
      });
    }
  },
};

export { authController };
