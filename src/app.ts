import express from 'express';

import { apollo } from './apollo';
import { mongo } from './mongo';
import routes from './routes';
import { getEnvVars } from './utils/getEnvVars';

export const App = async (): Promise<void> => {
  const server = express();
  const envs = getEnvVars();

  server.use(express.json());
  server.use(routes);
  await mongo({ uri: envs.MONGODB_URI });
  await apollo({ server, port: envs.SERVER_PORT });
};

const start = async () => await App();
start();
