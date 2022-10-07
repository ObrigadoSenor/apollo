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
import { authRequired } from '../utils/authRequired';
import { validObjectId } from '../utils/validObjectId';
import { ContextProps } from '../types';
import { getStatus } from '../utils/getStatus';
import { tagsMutation } from './tags';

export const projectQuery = {
  async getProjects(_: unknown, args: QueryGetProjectsArgs, ctx: ContextProps): Promise<GetProjects> {
    const ownerId = args?.ownerId || ctx?.id;
    const { success, status } = authRequired(ctx) && validObjectId(ownerId);
    if (!success) return { status };

    return await Projects.find({ ownerId })
      .then((data) => ({
        ...getStatus({ code: 200, message: `Successfully found project with user id: ${ownerId} ` }),
        data,
      }))
      .catch((message: string) => getStatus({ code: 500, message }));
  },
  async getProject(_: unknown, { projectId }: QueryGetProjectArgs, ctx: ContextProps): Promise<GetProject> {
    const { success, status } = authRequired(ctx) && validObjectId(projectId);
    if (!success) return { status };

    return await Projects.findOne({ projectId })
      .then((data) => ({
        ...getStatus({ code: 200, message: `Successfully found project wiht id: ${projectId} ` }),
        data,
      }))
      .catch((message: string) => getStatus({ code: 500, message }));
  },
};

export const projectMutation = {
  async setProject(_: unknown, args: MutationSetProjectArgs, ctx: ContextProps): Promise<SetProject> {
    const { success, status } = authRequired(ctx) && validObjectId(ctx.id);
    if (!success) return { status };

    const newProject = new Projects({
      ...args,
      ownerId: ctx.id,
    });
    return await newProject
      .save()
      .then(() => getStatus({ code: 200, message: `Successfully added project with id: ${newProject._id}` }))
      .catch((message: string) => getStatus({ code: 500, message }));
  },
  async deleteProject(_: unknown, { projectId }: MutationDeleteProjectArgs, ctx: ContextProps): Promise<DeleteProject> {
    const { success, status } = authRequired(ctx) && validObjectId(ctx.id);
    if (!success) return { status };

    return await Projects.deleteOne({ ownerId: ctx.id, _id: projectId })
      .then(async ({ deletedCount }) => {
        if (deletedCount <= 0) {
          return getStatus({ code: 400, message: `Wrong ids.` });
        }
        await tagsMutation.deleteTags(_, { projectId }, {});
        return getStatus({ code: 200, message: `Dropped project with id: ${projectId} from user with id: ${ctx.id}` });
      })
      .catch((message: string) => getStatus({ code: 500, message }));
  },
  async updateProject(
    _: unknown,
    { name, projectId }: MutationUpdateProjectArgs,
    ctx: ContextProps,
  ): Promise<UpdateProject> {
    const { success, status } = authRequired(ctx) && validObjectId(projectId);
    if (!success) return { status };

    return await Projects.updateOne({ _id: projectId }, { $set: { name } })
      .then(() => ({ status: { code: 200, message: `Successfully updated project with id: ${projectId}` } }))
      .catch((message: string) => getStatus({ code: 500, message }));
  },
};
