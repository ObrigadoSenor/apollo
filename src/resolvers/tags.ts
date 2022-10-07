import { Tags } from '../models/tags';
import {
  GetTag,
  GetTags,
  MutationSetTagArgs,
  QueryGetTagArgs,
  QueryGetTagsArgs,
  SetTag,
} from '../__generated__/resolvers-types';
import { ContextProps } from '../../types/apolloTypes';

export const tagsQuery = {
  getTags(_: unknown, { projectId }: QueryGetTagsArgs, { expiredToken, id }: ContextProps): GetTags {
    Tags.find();
    return { status: { code: 200 }, data: [] };
  },
  getTag(_: unknown, { projectId }: QueryGetTagArgs, { expiredToken }: ContextProps): GetTag {
    return { status: { code: 200 }, data: {} };
  },
};

export const tagsMutation = {
  setTag(_: unknown, { name, weight }: MutationSetTagArgs, { expiredToken, id }: ContextProps): SetTag {
    return { status: { code: 200 } };
  },
};
