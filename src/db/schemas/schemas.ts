import { schemaComposer } from 'graphql-compose';
import { userMutation, userQuery } from './user';

schemaComposer.Query.addFields({
  ...userQuery,
});

schemaComposer.Mutation.addFields({
  ...userMutation,
});

export const schema = schemaComposer.buildSchema();
