import { composeMongoose } from 'graphql-compose-mongoose';
import { Document, model, Schema } from 'mongoose';

interface TagsProps {
  name: string;
  weight: number;
}

interface TagsDocumentProps extends TagsProps, Document {}

export const TagsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
});

const Tags = model<TagsDocumentProps>('Tags', TagsSchema);

const TagsTC = composeMongoose(Tags, {});

const tagsQuery = {
  getTags: TagsTC.mongooseResolvers.findMany(),
  getTag: TagsTC.mongooseResolvers.findOne(),
};

const tagsMutation = {
  setTag: TagsTC.mongooseResolvers.createOne(),
  dropTag: TagsTC.mongooseResolvers.removeById(),
  updateTag: TagsTC.mongooseResolvers.updateById(),
};

export { tagsQuery, tagsMutation };
