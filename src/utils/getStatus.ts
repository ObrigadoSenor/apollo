import { Status } from '../__generated__/resolvers-types';

interface GetStatusTypeReturn {
  status: Status;
}

type GetStatusProps = Status & {
  code: 200 | 400 | 500;
  message?: string;
};

export const getStatus = ({ code, message, success }: GetStatusProps): GetStatusTypeReturn => {
  switch (code) {
    case 200:
      message = message ?? 'Successfull';
      success = success ?? true;
      break;
    case 400:
      message = message ?? 'Something went wrong';
      success = success ?? false;
      break;
    case 500:
      message = message ?? 'Something went wrong!';
      success = success ?? false;
      break;
    default:
      break;
  }
  return {
    status: {
      code,
      message,
      success,
    },
  };
};
