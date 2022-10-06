import { Document, model, Schema } from 'mongoose';
import { Project } from '../__generated__/resolvers-types';
import { Tags } from './tags';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tags: [Tags],
  ownerId: {
    type: String,
    required: true,
  },
});

export const Projects = model<Project & Document>('Projects', ProjectSchema);
