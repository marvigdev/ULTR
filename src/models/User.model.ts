import { Schema, model, ObjectId } from 'mongoose';

export interface UserI {
  _id: ObjectId;
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
