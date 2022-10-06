import { ContextProps } from './../apollo';
import {
  GetProjects,
  MutationSetProjectArgs,
  QueryGetProjectsArgs,
  SetProject,
} from '../__generated__/resolvers-types';

const Query = {
  getProjects(_: unknown, args: QueryGetProjectsArgs, ctx: ContextProps): GetProjects {
    return { status: { code: 200 }, data: [] };
  },
};

const Mutation = {
  setProject(_: unknown, args: MutationSetProjectArgs, ctx: ContextProps): SetProject {
    return { status: { code: 200 } };
  },
};

export const projects = {
  Query,
  Mutation: {},
};
