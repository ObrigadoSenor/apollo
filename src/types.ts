import { Express } from 'express';
import { Status } from './../src/__generated__/resolvers-types';

/* ENVS */
type EnvType = 'SERVER_PORT' | 'NODE_ENV' | 'MONGODB_USER_NAME' | 'MONGODB_PASSWORD' | 'MONGODB_URI';
export type EnvValueType = string | number;

export type EnvsType = NodeJS.ProcessEnv & {
  [key in EnvType]: EnvValueType;
};

/* APOLLO */
export interface GetApolloServerProps {
  server: Express;
  port: EnvValueType;
}

export interface ContextProps {
  expiredToken?: boolean;
  id?: string;
}

/* RESOLVER CHECKS */
export interface ResolveCheckType {
  success: boolean;
  status: Status;
}
