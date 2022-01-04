import { Schema, model } from 'mongoose';

export interface UserI {
  username: string;
  password: string;
}

const UserSchema = new Schema<UserI>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<UserI>('User', UserSchema);
export { User };
