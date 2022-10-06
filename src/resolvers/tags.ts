import {
  GetTag,
  GetTags,
  MutationSetTagArgs,
  QueryGetTagArgs,
  QueryGetTagsArgs,
  SetTag,
} from '../__generated__/resolvers-types';
import { ContextProps } from './../apollo';

export const tagsQuery = {
  getTags(_: unknown, { projectId }: QueryGetTagsArgs, { expired, id }: ContextProps): GetTags {
    return { status: { code: 200 }, data: [] };
  },
  getTag(_: unknown, { projectId }: QueryGetTagArgs, { expired }: ContextProps): GetTag {
    return { status: { code: 200 }, data: {} };
  },
};

export const tagsMutation = {
  setTag(_: unknown, { name, weight }: MutationSetTagArgs, { expired, id }: ContextProps): SetTag {
    return { status: { code: 200 } };
  },
};
