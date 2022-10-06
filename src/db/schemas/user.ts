import { composeMongoose } from 'graphql-compose-mongoose';
import { Document, model, Schema } from 'mongoose';

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

interface UserDocumentProps extends UserProps, Document {}

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

const User = model<UserDocumentProps>('User', UserSchema);

const UserTC = composeMongoose(User, {});

const userQuery = {
  getUsers: UserTC.mongooseResolvers.findMany(),
  getUser: UserTC.mongooseResolvers.findOne(),
};

const userMutation = {
  setUser: UserTC.mongooseResolvers.createOne(),
  dropUser: UserTC.mongooseResolvers.removeById(),
  updateUser: UserTC.mongooseResolvers.updateById(),
};

export { userQuery, userMutation };
