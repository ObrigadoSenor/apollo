import { ContextProps } from '../../types/apolloTypes';
import { Status } from '../__generated__/resolvers-types';

export const authRequired = (ctx: ContextProps): Status => {
  console.log('ctx', ctx);

  if (ctx.expiredToken) {
    return { code: 500, error: 'Token is expired', success: false };
  }
  return { code: 200, error: 'Token is valid', success: true };
};
