import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type DeleteProject = {
  status?: Maybe<Status>;
};

export type DeleteTag = {
  status?: Maybe<Status>;
};

export type GetProject = {
  data?: Maybe<Project>;
  status?: Maybe<Status>;
};

export type GetProjects = {
  data?: Maybe<Array<Maybe<Project>>>;
  status?: Maybe<Status>;
};

export type GetTags = {
  data?: Maybe<Array<Maybe<Tags>>>;
  status?: Maybe<Status>;
};

export type Mutation = {
  deleteProject?: Maybe<DeleteProject>;
  deleteTag?: Maybe<DeleteTag>;
  setProject?: Maybe<SetProject>;
  setTag?: Maybe<SetTag>;
  updateProject?: Maybe<UpdateProject>;
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationDeleteTagArgs = {
  projectId: Scalars['String'];
  tagId: Scalars['String'];
};


export type MutationSetProjectArgs = {
  name: Scalars['String'];
};


export type MutationSetTagArgs = {
  name: Scalars['String'];
  projectId: Scalars['String'];
  weight: Scalars['Int'];
};


export type MutationUpdateProjectArgs = {
  name?: InputMaybe<Scalars['String']>;
  projectId: Scalars['String'];
};

export type Project = {
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type Query = {
  getProject?: Maybe<GetProject>;
  getProjects?: Maybe<GetProjects>;
  getTags?: Maybe<GetTags>;
};


export type QueryGetProjectArgs = {
  projectId: Scalars['String'];
};


export type QueryGetProjectsArgs = {
  ownerId?: InputMaybe<Scalars['String']>;
};


export type QueryGetTagsArgs = {
  projectId: Scalars['String'];
};

export type SetProject = {
  status?: Maybe<Status>;
};

export type SetTag = {
  status?: Maybe<Status>;
};

export type Status = {
  code?: Maybe<Scalars['Int']>;
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Tag = {
  name?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

export type Tags = {
  projectId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type UpdateProject = {
  status?: Maybe<Status>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DeleteProject: ResolverTypeWrapper<DeleteProject>;
  DeleteTag: ResolverTypeWrapper<DeleteTag>;
  GetProject: ResolverTypeWrapper<GetProject>;
  GetProjects: ResolverTypeWrapper<GetProjects>;
  GetTags: ResolverTypeWrapper<GetTags>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  SetProject: ResolverTypeWrapper<SetProject>;
  SetTag: ResolverTypeWrapper<SetTag>;
  Status: ResolverTypeWrapper<Status>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tag: ResolverTypeWrapper<Tag>;
  Tags: ResolverTypeWrapper<Tags>;
  UpdateProject: ResolverTypeWrapper<UpdateProject>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  DeleteProject: DeleteProject;
  DeleteTag: DeleteTag;
  GetProject: GetProject;
  GetProjects: GetProjects;
  GetTags: GetTags;
  Int: Scalars['Int'];
  Mutation: {};
  Project: Project;
  Query: {};
  SetProject: SetProject;
  SetTag: SetTag;
  Status: Status;
  String: Scalars['String'];
  Tag: Tag;
  Tags: Tags;
  UpdateProject: UpdateProject;
};

export type DeleteProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteProject'] = ResolversParentTypes['DeleteProject']> = {
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteTag'] = ResolversParentTypes['DeleteTag']> = {
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetProject'] = ResolversParentTypes['GetProject']> = {
  data?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetProjectsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetProjects'] = ResolversParentTypes['GetProjects']> = {
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetTagsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetTags'] = ResolversParentTypes['GetTags']> = {
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tags']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  deleteProject?: Resolver<Maybe<ResolversTypes['DeleteProject']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'projectId'>>;
  deleteTag?: Resolver<Maybe<ResolversTypes['DeleteTag']>, ParentType, ContextType, RequireFields<MutationDeleteTagArgs, 'projectId' | 'tagId'>>;
  setProject?: Resolver<Maybe<ResolversTypes['SetProject']>, ParentType, ContextType, RequireFields<MutationSetProjectArgs, 'name'>>;
  setTag?: Resolver<Maybe<ResolversTypes['SetTag']>, ParentType, ContextType, RequireFields<MutationSetTagArgs, 'name' | 'projectId' | 'weight'>>;
  updateProject?: Resolver<Maybe<ResolversTypes['UpdateProject']>, ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'projectId'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getProject?: Resolver<Maybe<ResolversTypes['GetProject']>, ParentType, ContextType, RequireFields<QueryGetProjectArgs, 'projectId'>>;
  getProjects?: Resolver<Maybe<ResolversTypes['GetProjects']>, ParentType, ContextType, Partial<QueryGetProjectsArgs>>;
  getTags?: Resolver<Maybe<ResolversTypes['GetTags']>, ParentType, ContextType, RequireFields<QueryGetTagsArgs, 'projectId'>>;
};

export type SetProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetProject'] = ResolversParentTypes['SetProject']> = {
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetTag'] = ResolversParentTypes['SetTag']> = {
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = {
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tags'] = ResolversParentTypes['Tags']> = {
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateProject'] = ResolversParentTypes['UpdateProject']> = {
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DeleteProject?: DeleteProjectResolvers<ContextType>;
  DeleteTag?: DeleteTagResolvers<ContextType>;
  GetProject?: GetProjectResolvers<ContextType>;
  GetProjects?: GetProjectsResolvers<ContextType>;
  GetTags?: GetTagsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SetProject?: SetProjectResolvers<ContextType>;
  SetTag?: SetTagResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Tags?: TagsResolvers<ContextType>;
  UpdateProject?: UpdateProjectResolvers<ContextType>;
};

