import { User, UserI } from '../models/User.model';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
const jwtSecret = 'supersecretyes';

const userService = {
  getUserByUsername: async (username: string) => {
    const user = await User.findOne({ username });
    if (!user)
      throw new Error(
        'Your username or password is incorrect or was not found.'
      );
    return user;
  },

  passwordMatch: async (user: UserI, password: string) => {
    const doesMatch = compare(user.password, password);
    if (!doesMatch)
      throw new Error(
        'Your username or password is incorrect or was not found.'
      );
    return doesMatch;
  },

  generateJwt: async (user: UserI) => {
    const jwt = sign(user, jwtSecret);
    return jwt;
  },
};

export { userService };
