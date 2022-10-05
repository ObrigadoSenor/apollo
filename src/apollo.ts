import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { readFileSync } from 'fs';

import http from 'http';
import { resolvers } from './gql/resolvers';

import { EnvValueType } from '../types/envs';
import { ApolloContext, dataSources } from './gql/data/dataSources';

interface GetApolloServerProps {
  server: Express;
  port: EnvValueType;
}

export const Apollo = async ({ server, port }: GetApolloServerProps) => {
  const httpServer = http.createServer(server);

  const typeDefs = readFileSync(`${__dirname}/gql/schemas/schemas.graphql`, { encoding: 'utf-8' });

  const apollo = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources,
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
