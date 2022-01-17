import {gql} from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: {email: $email, password: $password})
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $password: String!) {
    login(input: {email: $email, password: $password})
  }
`;
