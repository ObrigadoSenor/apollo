import { Document, Schema, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

export interface UserProps {
  name: string;
  email: string;
}

export interface UserDocumentProps extends UserProps, Document {}

export const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

export const User = model<UserDocumentProps>('User', UserSchema);

const customizationOptions = {};

export const UserTC = composeMongoose(User, customizationOptions);

schemaComposer.Query.addFields({
  getAllUsers: UserTC.mongooseResolvers.findMany(),
  getUser: UserTC.mongooseResolvers.findOne({ filter: { requiredFields: 'email' } }),
});

schemaComposer.Mutation.addFields({
  setUser: UserTC.mongooseResolvers.createOne(),
});

export const schema = schemaComposer.buildSchema();
