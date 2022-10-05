import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { readFileSync } from 'fs';

import http from 'http';
import { resolvers } from './gql/resolvers';

import { EnvsType, EnvValueType } from './../types/envs';
import routes from './routes';
import { ApolloContext, dataSources } from './gql/data/dataSources';

export const App = async () => {
  const server = express();
  const envs = getEnvVars();

  server.use(express.json());
  server.use(routes);

  await getApolloServer({ server, port: envs.SERVER_PORT });

  return { server, ...envs };
};

const getEnvVars = () => {
  const path = `.env.${process.env.NODE_ENV}`;
  dotenv.config({ path });
  return { ...(process.env as EnvsType) };
};

interface GetApolloServerProps {
  server: Express;
  port: EnvValueType;
}

const getApolloServer = async ({ server, port }: GetApolloServerProps) => {
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
