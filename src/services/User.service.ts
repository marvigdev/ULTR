import { User } from '../models/User.model';
import { hashPayload } from './BCrypt.service';

async function getUserByUsername(username: string) {
  const user = await User.findOne({ username });
  return user;
}

async function createUser(username: string, password: string) {
  const hashedPassword = await hashPayload(password);
  const user = new User({
    username,
    password: hashedPassword,
  });
  await user.save();
  return user;
}

export { getUserByUsername, createUser };
