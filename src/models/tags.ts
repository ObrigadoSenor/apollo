import { Document, model, Schema } from 'mongoose';
import { Tag } from '../__generated__/resolvers-types';

export const TagsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  ownerId: {
    type: String,
    required: true,
  },
});

export const Tags = model<Tag & Document>('Tags', TagsSchema);
