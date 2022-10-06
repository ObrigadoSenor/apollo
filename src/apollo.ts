import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';

import http from 'http';

import { EnvValueType } from '../types/envs';
import { schema } from './db/schemas/schemas';
import { validToken } from './utils/validToken';

interface GetApolloServerProps {
  server: Express;
  port: EnvValueType;
}

export const Apollo = async ({ server, port }: GetApolloServerProps) => {
  const httpServer = http.createServer(server);

  const apollo = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      const { node } = (await validToken(token)) || {};
      console.log('req', req);

      return {
        expired: node?.expired,
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
