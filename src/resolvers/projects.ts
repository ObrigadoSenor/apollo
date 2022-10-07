import {
  DeleteProject,
  GetProject,
  GetProjects,
  MutationDeleteProjectArgs,
  MutationSetProjectArgs,
  MutationUpdateProjectArgs,
  QueryGetProjectArgs,
  QueryGetProjectsArgs,
  SetProject,
  UpdateProject,
} from '../__generated__/resolvers-types';
import { Projects } from '../models/projects';
import { ContextProps } from '../../types/apolloTypes';
import { authRequired } from '../utils/authRequired';

export const projectQuery = {
  async getProjects(_: unknown, { ownerId }: QueryGetProjectsArgs, ctx: ContextProps): Promise<GetProjects> {
    const auth = authRequired(ctx);
    if (!auth.success) {
      return { status: { ...auth } };
    }

    return await Projects.find({ ownerId })
      .then((data) => ({
        status: {
          code: 200,
          message: `Successfully found project wiht user id: ${ownerId} `,
        },
        data,
      }))
      .catch((error: string) => ({ status: { code: 500, error } }));
  },
  async getProject(_: unknown, { _id }: QueryGetProjectArgs, ctx: ContextProps): Promise<GetProject> {
    const auth = authRequired(ctx);
    if (!auth.success) {
      return { status: { ...auth } };
    }
    return await Projects.findOne({ _id })
      .then((data) => ({
        status: {
          code: 200,
          message: `Successfully found project wiht id: ${_id} `,
        },
        data,
      }))
      .catch((error: string) => ({ status: { code: 500, error } }));
  },
};

export const projectMutation = {
  async setProject(_: unknown, args: MutationSetProjectArgs, ctx: ContextProps): Promise<SetProject> {
    const auth = authRequired(ctx);
    if (!auth.success) {
      return { status: { ...auth } };
    }
    const newProject = new Projects({
      ...args,
    });
    return await newProject
      .save()
      .then(() => ({ status: { code: 200 } }))
      .catch((error: string) => ({ status: { code: 500, error } }));
  },
  async deleteProject(_: unknown, args: MutationDeleteProjectArgs, ctx: ContextProps): Promise<DeleteProject> {
    const auth = authRequired(ctx);
    if (!auth.success) {
      return { status: { ...auth } };
    }
    return await Projects.deleteOne({ ...args })
      .then(() => ({
        status: { code: 200, message: `Dropped project with id: ${args._id} from user with id: ${args.ownerId}` },
      }))
      .catch((error: string) => ({ status: { code: 500, error } }));
  },
  async updateProject(_: unknown, { name, _id }: MutationUpdateProjectArgs, ctx: ContextProps): Promise<UpdateProject> {
    const auth = authRequired(ctx);
    if (!auth.success) {
      return { status: { ...auth } };
    }
    return await Projects.updateOne({ _id }, { $set: { name } })
      .then(() => ({ status: { code: 200, message: `Successfully updated project with id: ${_id}` } }))
      .catch((error: string) => ({ status: { code: 500, error } }));
  },
};
