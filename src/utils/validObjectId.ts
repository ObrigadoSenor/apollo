import { isValidObjectId } from 'mongoose';
import { ResolveCheckType } from '../types';

export const validObjectId = (objctId: string | string[]): ResolveCheckType => {
  let success = isValidObjectId(objctId);

  if (Array.isArray(objctId)) {
    success = objctId.filter((str) => isValidObjectId(str) === false).length <= 0;
  }

  return {
    success,
    status: { code: success ? 200 : 500, error: `Object id is ${success ? '' : 'not'} valid`, success },
  };
};
