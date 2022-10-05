import { DataSource } from 'apollo-datasource';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import { Person } from '../__generated__/resolvers-types';

export interface ApolloContext {
  dataSources: {
    people: Person[];
  };
}

type DataSourcesProps = ApolloContext['dataSources'];

const people = [
  { id: '1', name: 'Cassie' },
  { id: '2', name: 'Rue' },
  { id: '3', name: 'Lexi' },
] as DataSource<Pick<DataSourcesProps, 'people'>>;

export const dataSources = (): DataSources<DataSourcesProps> => ({
  people,
});
