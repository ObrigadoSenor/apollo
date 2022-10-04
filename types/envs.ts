type EnvType = 'SERVER_PORT' | 'NODE_ENV';
export type EnvValueType = string | number;

export type EnvsType = NodeJS.ProcessEnv & {
  [key in EnvType]: EnvValueType;
};
