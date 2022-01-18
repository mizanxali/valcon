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

export const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $riotID: String
    $tagline: String
    $clips: [String!]
    $agents: [String!]
    $favoriteMap: String
    $lookingToPlay: String
    $rank: Int
    $server: String
  ) {
    editProfile(
      input: {
        riotID: $riotID
        tagline: $tagline
        clips: $clips
        agents: $agents
        favoriteMap: $favoriteMap
        lookingToPlay: $lookingToPlay
        rank: $rank
        server: $server
      }
    ) {
      _id
      discoverable
      user
      riotID
      tagline
      clips
      agents
      favoriteMap
      lookingToPlay
      rank
      server
    }
  }
`;
