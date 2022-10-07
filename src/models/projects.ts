import { Document, model, Schema } from 'mongoose';
import { Project } from '../__generated__/resolvers-types';
import { TagsSchema } from './tags';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tags: [TagsSchema],
  ownerId: {
    type: String,
    required: true,
  },
});

export const Projects = model<Project & Document>('Projects', ProjectSchema);
