import { Projects } from '../models/projects';
import { Tag, Tags } from '../models/tags';
import { ContextProps } from '../types';
import { authRequired } from '../utils/authRequired';
import { validObjectId } from '../utils/validObjectId';
import {
  DeleteTag,
  GetTags,
  MutationDeleteTagArgs,
  MutationSetTagArgs,
  QueryGetTagsArgs,
  SetTag,
} from '../__generated__/resolvers-types';

export const tagsQuery = {
  async getTags(_: unknown, { projectId }: QueryGetTagsArgs, ctx: ContextProps): Promise<GetTags> {
    const { success, status } = authRequired(ctx) && validObjectId(projectId);
    if (!success) {
      return { status };
    }

    return await Tags.find({ projectId })
      .then((data) => ({
        status: {
          code: 200,
          message: `Successfully found tags wiht project id: ${projectId} `,
        },
        data,
      }))
      .catch((error: string) => ({ status: { code: 500, error } }));
  },
};

export const tagsMutation = {
  async setTag(_: unknown, args: MutationSetTagArgs, ctx: ContextProps): Promise<SetTag> {
    const { success, status } = authRequired(ctx) && validObjectId(args.projectId);
    if (!success) {
      return { status };
    }

    const { projectId, ...tagRest } = args;

    const setTag = {
      ...tagRest,
    };

    const exist = await Tags.exists({ projectId });

    if (exist) {
      const newTag = new Tag(setTag);
      return await Tags.findOneAndUpdate({ projectId }, { $push: { tags: newTag } })
        .then(async () => {
          await addTagToProject(projectId, newTag._id);
          return { status: { code: 200, message: `Successfully added tag with id: ${newTag._id}`, success: true } };
        })
        .catch((error: string) => ({ status: { code: 500, error, success: false } }));
    } else {
      const newTags = new Tags({
        projectId,
        tags: [setTag],
      });

      return await newTags
        .save()
        .then(async () => {
          await addTagToProject(projectId, newTags._id);
          return {
            status: { code: 200, message: `Successfully added tag tree with id: ${newTags._id}`, success: true },
          };
        })

        .catch((error: string) => ({ status: { code: 500, error, success: false } }));
    }
  },
  async deleteTag(_: unknown, { projectId, tagId }: MutationDeleteTagArgs, ctx: ContextProps): Promise<DeleteTag> {
    const { success, status } = authRequired(ctx) && validObjectId([projectId, tagId]);
    if (!success) {
      return { status };
    }

    return await Tags.updateOne({ projectId }, { $pull: { tags: { _id: tagId } } }, { safe: true, multi: true })
      .then(async () => {
        await removeTagFromProject(projectId, tagId);
        return { status: { code: 200, message: `Successfully removed tag with id: ${tagId}` } };
      })
      .catch((error: string) => ({ status: { code: 500, error } }));
  },
};

const addTagToProject = async (projectId: string, tagId: string) =>
  await Projects.findByIdAndUpdate({ _id: projectId }, { $push: { tags: { tagId } } }, { safe: true, multi: true });

const removeTagFromProject = async (projectId: string, tagId: string) =>
  await Projects.findByIdAndUpdate({ _id: projectId }, { $pull: { tags: { tagId } } }, { safe: true, multi: true });
