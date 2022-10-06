import { ContextProps } from './../apollo';
import {
  GetTag,
  GetTags,
  Mutation,
  MutationSetTagArgs,
  Query,
  QueryGetTagsArgs,
  QueryGetTagArgs,
  SetTag,
} from '../__generated__/resolvers-types';

const Query = {
  getTags(_: unknown, { projectId }: QueryGetTagsArgs, { expired }: ContextProps): GetTags {
    return { status: { code: 200 }, data: [] };
  },
  getTag(_: unknown, { projectId }: QueryGetTagArgs, { expired }: ContextProps): GetTag {
    return { status: { code: 200 }, data: {} };
  },
};

const Mutation = {
  setTag(_: unknown, { name, weight }: MutationSetTagArgs, { expired }: ContextProps): SetTag {
    return { status: { code: 200 } };
  },
};

export const tags = {
  Query,
  Mutation,
};
