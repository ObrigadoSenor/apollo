import express from 'express';

import { Apollo } from './apollo';
import { connectToDB } from './mongo';
import routes from './routes';
import { getEnvVars } from './utils/getEnvVars';

export const App = async (): Promise<void> => {
  const server = express();
  const envs = getEnvVars();

  server.use(express.json());
  server.use(routes);
  await connectToDB({ uri: envs.MONGODB_URI });
  await Apollo({ server, port: envs.SERVER_PORT });
};

const start = async () => await App();
start();
