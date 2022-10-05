import { composeMongoose } from 'graphql-compose-mongoose';
import { Document, model, Schema } from 'mongoose';

interface UserProps {
  name: string;
  email: string;
}

interface UserDocumentProps extends UserProps, Document {}

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

const User = model<UserDocumentProps>('User', UserSchema);

const UserTC = composeMongoose(User, {});

const userQuery = {
  getAllUsers: UserTC.mongooseResolvers.findMany(),
  getUser: UserTC.mongooseResolvers.findOne({ filter: { requiredFields: 'email' } }),
};

const userMutation = {
  setUser: UserTC.mongooseResolvers.createOne(),
  dropUser: UserTC.mongooseResolvers.removeById(),
  updateUser: UserTC.mongooseResolvers.updateById(),
};

export { userQuery, userMutation };
