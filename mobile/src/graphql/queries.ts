import {gql} from '@apollo/client';

export const GET_PROFILE_QUERY = gql`
  {
    getProfile {
      _id
      discoverable
      user
      riotID
      tagline
      clip
      agents
      favoriteMap
      lookingToPlay
      rank
      server
    }
  }
`;

export const GET_PROFILES_QUERY = gql`
  {
    getProfiles {
      _id
      user
      riotID
      tagline
      clip
      agents
      favoriteMap
      lookingToPlay
      rank
      server
    }
  }
`;

export const GET_MATCHES_QUERY = gql`
  {
    getMatches {
      _id
      riotID
      tagline
    }
  }
`;

export const ME_QUERY = gql`
  {
    me {
      _id
      email
      createdAt
      minRank
      maxRank
    }
  }
`;
