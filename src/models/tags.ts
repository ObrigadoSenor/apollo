import { Document, model, Schema } from 'mongoose';
import { Tags as TagsType, Tag as TagType } from '../__generated__/resolvers-types';

export const TagSchema = new Schema({
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
});

export const TagsSchema = new Schema({
  projectId: {
    type: String,
    required: true,
  },
  tags: [TagSchema],
});

export const Tag = model<TagType & Document>('Tag', TagSchema);

export const Tags = model<TagsType & Document>('Tags', TagsSchema);
