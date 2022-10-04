import { Resolvers } from './__generated__/resolvers-types';

export const resolvers: Resolvers = {
  Query: {
    getAllPeople: (_, __, { dataSources }) => dataSources.people,
    getPerson: (_, { id }, { dataSources }) =>
      dataSources.people.find((person) => Number(person.id) === Number(id)) || null,
  },
};
