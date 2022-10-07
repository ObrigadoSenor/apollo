import { Express } from 'express';
import { EnvValueType } from './envs';

export interface GetApolloServerProps {
  server: Express;
  port: EnvValueType;
}

export interface ContextProps {
  expiredToken: boolean;
  id: string;
}
