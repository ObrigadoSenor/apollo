import { Document, model, Schema } from 'mongoose';
import { Project } from '../__generated__/resolvers-types';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  tags: [
    {
      tagId: String,
    },
  ],
});

export const Projects = model<Project & Document>('Projects', ProjectSchema);
