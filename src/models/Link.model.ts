import { Schema, model, Types } from 'mongoose';

export interface LinkI {
  title: string;
  link: string;
  description?: string;
  tags?: Types.Array<string>;
  owner: Types.ObjectId;
}

const LinkSchema = new Schema<LinkI>({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
  },
  owner: {
    type: Types.ObjectId,
    required: true,
  },
});

const Link = model<LinkI>('Link', LinkSchema);
export { Link };
