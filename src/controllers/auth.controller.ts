import { Request, Response } from 'express';
import { comparePayload } from '../services/BCrypt.service';
import { deleteCookie, setCookie } from '../services/Cookies.service';
import { signJWT } from '../services/JWT.service';
import { createUser, getUserByUsername } from '../services/User.service';
import { throwAuthError } from '../services/Error.service';

const authController = {
  renderLogin: async (_: Request, res: Response) => {
    res.render('login');
  },

  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
      const user = await getUserByUsername(username);
      if (!user) return throwAuthError('AUTH/INVALID_CREDENTIALS');

      const doesPasswordMatch = await comparePayload(password, user.password);
      if (!doesPasswordMatch) throwAuthError('AUTH/INVALID_CREDENTIALS');

      const authToken = signJWT({
        username: user.username,
        userId: user._id,
      });
      setCookie(res, 'authToken', authToken);

      return res.redirect(`/app`);
    } catch (err: any) {
      return res.render('login', {
        error: err.message,
      });
    }
  },

  renderRegister: async (_: Request, res: Response) => {
    res.render('register');
  },

  register: async (req: Request, res: Response) => {
    try {
      const { username, password, confirmPassword } = req.body;

      if (password !== confirmPassword)
        throwAuthError('AUTH/PASSWORD_DOESNT_MATCH');

      const user = await getUserByUsername(username);
      if (user) throwAuthError('AUTH/USERNAME_ALREADY_EXISTS');

      await createUser(username, password);

      return res.render('register', {
        message: 'You created an account! You can login now.',
      });
    } catch (err: any) {
      return res.render('register', {
        error: err.message,
      });
    }
  },

  logout: async (_: Request, res: Response) => {
    deleteCookie(res, 'authToken');
    res.redirect('/login');
  },
};

export { authController };
