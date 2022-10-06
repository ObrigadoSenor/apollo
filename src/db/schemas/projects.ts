import { composeMongoose } from 'graphql-compose-mongoose';
import { Document, model, Schema } from 'mongoose';
import { TagsSchema } from './tags';

interface ProjectsProps {
  name: string;
  tags: string[];
  ownerId: string;
}

interface ProjectsDocumentProps extends ProjectsProps, Document {}

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

const Project = model<ProjectsDocumentProps>('Project', ProjectSchema);

const ProjectTC = composeMongoose(Project, {});

const projectQuery = {
  getProjects: ProjectTC.mongooseResolvers.findMany(),
  getProject: ProjectTC.mongooseResolvers.findOne(),
  getUserProjects: ProjectTC.mongooseResolvers.findMany({ filter: { requiredFields: ['ownerId'] } }),
};

const projectMutation = {
  setProject: ProjectTC.mongooseResolvers.createOne({ record: { requiredFields: ['ownderId'] } }),
  dropProject: ProjectTC.mongooseResolvers.removeById(),
  updateProject: ProjectTC.mongooseResolvers.updateById(),
};

export { projectQuery, projectMutation };
