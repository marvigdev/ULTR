import { User, UserI } from '../models/User.model';
import { compare, hash } from 'bcrypt';
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

  createUser: async (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword)
      throw new Error('Password confirmation does not match.');

    const user = await User.findOne({ username });
    if (user) throw new Error('An account with this username already exists.');

    const encryptedPassword = await hash(password, 10);
    const newUser = new User({
      username,
      password: encryptedPassword,
    });
    newUser.save();

    return newUser;
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
