import { projectQuery, projectMutation } from './projects';
import { tagsQuery, tagsMutation } from './tags';

export default {
  Query: {
    ...projectQuery,
    ...tagsQuery,
  },
  Mutation: {
    ...projectMutation,
    ...tagsMutation,
  },
};
