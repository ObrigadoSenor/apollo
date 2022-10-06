import { ContextProps } from './../apollo';
import {
  GetProjects,
  MutationSetProjectArgs,
  QueryGetProjectsArgs,
  SetProject,
} from '../__generated__/resolvers-types';

export const projectQuery = {
  getProjects(_: unknown, args: QueryGetProjectsArgs, ctx: ContextProps): GetProjects {
    return { status: { code: 200 }, data: [] };
  },
};

export const projectMutation = {
  setProject(_: unknown, args: MutationSetProjectArgs, ctx: ContextProps): SetProject {
    return { status: { code: 200 } };
  },
};
