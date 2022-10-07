import { ContextProps, ResolveCheckType } from '../types';
import { getStatus } from './getStatus';

export const authRequired = ({ expiredToken }: ContextProps): ResolveCheckType => {
  const code = expiredToken ? 500 : 200;
  const message = expiredToken ? 'Token is expired' : 'Token is valid';
  return { success: !!expiredToken, ...getStatus({ code, message }) };
};
