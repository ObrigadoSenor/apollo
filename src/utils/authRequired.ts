import { ContextProps, ResolveCheckType } from '../types';

export const authRequired = (ctx: ContextProps): ResolveCheckType => {
  if (ctx.expiredToken) {
    return { success: false, status: { code: 500, error: 'Token is expired', success: false } };
  }
  return { success: true, status: { code: 200, error: 'Token is valid', success: true } };
};
