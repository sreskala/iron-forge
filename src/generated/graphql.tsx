import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createWorkout: Workout;
  login: UserResponse;
  register: UserResponse;
  updateWorkout: Workout;
};


export type MutationCreateWorkoutArgs = {
  name: Scalars['String'];
  type: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInput: UserNamePasswordInput;
};


export type MutationRegisterArgs = {
  registrationInput: UserNamePasswordInput;
};


export type MutationUpdateWorkoutArgs = {
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  workout?: Maybe<Workout>;
  workouts: Array<Workout>;
};


export type QueryWorkoutArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  userName: Scalars['String'];
};

export type UserNamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['Float'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type BaseUserFragment = { __typename?: 'User', id: number, userName: string, createdAt: string, updatedAt: string };

export type LoginMutationVariables = Exact<{
  loginInput: UserNamePasswordInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, userName: string, createdAt: string, updatedAt: string } | null } };

export type RegisterMutationVariables = Exact<{
  registrationInput: UserNamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, userName: string, createdAt: string, updatedAt: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, userName: string, createdAt: string, updatedAt: string } | null };

export const BaseUserFragmentDoc = gql`
    fragment BaseUser on User {
  id
  userName
  createdAt
  updatedAt
}
    `;
export const LoginDocument = gql`
    mutation Login($loginInput: UserNamePasswordInput!) {
  login(loginInput: $loginInput) {
    errors {
      field
      message
    }
    user {
      ...BaseUser
    }
  }
}
    ${BaseUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($registrationInput: UserNamePasswordInput!) {
  register(registrationInput: $registrationInput) {
    errors {
      field
      message
    }
    user {
      ...BaseUser
    }
  }
}
    ${BaseUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};