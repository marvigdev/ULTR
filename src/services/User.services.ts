import { User, UserI } from '../models/User.model';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { jwtSecret } from '..';

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
    await newUser.save();

    return newUser;
  },

  passwordMatch: async (user: UserI, password: string) => {
    const doesMatch = await compare(password, user.password);
    if (!doesMatch)
      throw new Error(
        'Your username or password is incorrect or was not found.'
      );
    return doesMatch;
  },

  generateJwt: async (user: UserI) => {
    const jwt = sign(
      {
        username: user.username,
        userId: user._id,
      },
      jwtSecret
    );
    return jwt;
  },

  setToken: async (res: Response, token: string) => {
    res.cookie('authToken', token);
  },
};

export { userService };
