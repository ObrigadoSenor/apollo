import { connection, connect } from 'mongoose';
import { EnvValueType } from '../../types/envs';

interface ConnectToDBProps {
  uri: EnvValueType;
}

export const connectToDB = async ({ uri }: ConnectToDBProps) => {
  connection.on('connected', () => console.log('Mongoose is connected successfully'));
  connection.on('disconnected', () => console.log('Mongoose is disconnected successfully'));
  connection.on('error', (err) => console.log(`Mongoose error: ${err}`));

  return await connect(`${uri?.toString()}`, {});
};
