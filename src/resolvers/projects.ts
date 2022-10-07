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
import { Tags } from '../models/tags';
import { ContextProps } from '../types';

export const projectQuery = {
  async getProjects(_: unknown, args: QueryGetProjectsArgs, ctx: ContextProps): Promise<GetProjects> {
    const ownerId = args.ownerId || ctx.id;
    const { success, ...rest } = authRequired(ctx) && validObjectId(ownerId);
    if (!success) {
      return { ...rest };
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
  async getProject(_: unknown, { projectId }: QueryGetProjectArgs, ctx: ContextProps): Promise<GetProject> {
    const { success, ...rest } = authRequired(ctx) && validObjectId(projectId);
    if (!success) {
      return { ...rest };
    }
    return await Projects.findOne({ projectId })
      .then((data) => ({
        status: {
          code: 200,
          message: `Successfully found project wiht id: ${projectId} `,
        },
        data,
      }))
      .catch((error: string) => ({ status: { code: 500, error } }));
  },
};

export const projectMutation = {
  async setProject(_: unknown, args: MutationSetProjectArgs, ctx: ContextProps): Promise<SetProject> {
    const { success, status } = authRequired(ctx) && validObjectId(ctx.id);
    if (!success) {
      return { status };
    }

    const newProject = new Projects({
      ...args,
      ownerId: ctx.id,
    });
    return await newProject
      .save()
      .then(() => ({ status: { code: 200 } }))
      .catch((error: string) => ({ status: { code: 500, error } }));
  },
  async deleteProject(_: unknown, { projectId }: MutationDeleteProjectArgs, ctx: ContextProps): Promise<DeleteProject> {
    const { success, ...rest } = authRequired(ctx) && validObjectId(ctx.id);
    if (!success) {
      return { ...rest };
    }

    return await Projects.deleteOne({ ownerId: ctx.id, _id: projectId })
      .then(async ({ deletedCount }) => {
        if (deletedCount <= 0) {
          return {
            status: { code: 400, error: `Wrong ids.`, success: false },
          };
        }
        await Tags.deleteOne({ projectId });
        return {
          status: {
            code: 200,
            message: `Dropped project with id: ${projectId} from user with id: ${ctx.id}`,
            success: true,
          },
        };
      })
      .catch((error: string) => ({ status: { code: 500, error } }));
  },
  async updateProject(
    _: unknown,
    { name, projectId }: MutationUpdateProjectArgs,
    ctx: ContextProps,
  ): Promise<UpdateProject> {
    const { success, ...rest } = authRequired(ctx) && validObjectId(projectId);
    if (!success) {
      return { ...rest };
    }

    return await Projects.updateOne({ _id: projectId }, { $set: { name } })
      .then(() => ({ status: { code: 200, message: `Successfully updated project with id: ${projectId}` } }))
      .catch((error: string) => ({ status: { code: 500, error } }));
  },
};
