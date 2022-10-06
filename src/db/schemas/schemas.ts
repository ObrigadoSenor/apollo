import { schemaComposer } from 'graphql-compose';
import { projectMutation, projectQuery } from './projects';
import { tagsMutation, tagsQuery } from './tags';
import { userMutation, userQuery } from './user';

schemaComposer.Query.addFields({
  ...userQuery,
  ...projectQuery,
  ...tagsQuery,
});

schemaComposer.Mutation.addFields({
  ...userMutation,
  ...projectMutation,
  ...tagsMutation,
});

export const schema = schemaComposer.buildSchema();
