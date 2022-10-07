import { isValidObjectId } from 'mongoose';
import { ResolveCheckType } from '../types';
import { getStatus } from './getStatus';

export const validObjectId = (objctId?: string | string[]): ResolveCheckType => {
  let success = isValidObjectId(objctId);

  if (Array.isArray(objctId)) {
    success = objctId.filter((str) => isValidObjectId(str) === false).length <= 0;
  }

  return {
    success,
    ...getStatus({ code: success ? 200 : 500, message: `Object id is ${success ? '' : 'not'} valid` }),
  };
};
