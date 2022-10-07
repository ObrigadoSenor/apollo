import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';

import http from 'http';

import { validToken } from './utils/validToken';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { resolve } from 'path';
import resolvers from './resolvers';
import { ContextProps, GetApolloServerProps } from './types';

const loadSchema = loadSchemaSync(resolve(__dirname, 'schemas/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schema = addResolversToSchema({
  schema: loadSchema,
  resolvers,
});

export const Apollo = async ({ server, port }: GetApolloServerProps) => {
  const httpServer = http.createServer(server);

  const apollo = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    context: async ({ req }): Promise<ContextProps> => {
      const token = req.headers.authorization || '';
      const id = (req.headers.id || '') as string;
      const { node } = (await validToken(token)) || {};

      return {
        expiredToken: node?.expired,
        id,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apollo.start();

  apollo.applyMiddleware({ app: server });

  return new Promise((resolve, reject) => {
    return httpServer
      .listen(port)
      .once('listening', () => {
        console.log(`Apollo is listening on port: ${port}`);
        return resolve;
      })
      .once('error', (error) => {
        console.log(`Apollo crashed: ${error}`);
        return reject;
      });
  });
};
