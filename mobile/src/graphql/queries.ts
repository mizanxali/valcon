import {gql} from '@apollo/client';

export const GET_PROFILE_QUERY = gql`
  {
    getProfile {
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

export const GET_PROFILES_QUERY = gql`
  query ($minRank: Int!, $maxRank: Int!, $servers: [String!]!) {
    getProfiles(
      input: {minRank: $minRank, maxRank: $maxRank, servers: $servers}
    ) {
      _id
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
