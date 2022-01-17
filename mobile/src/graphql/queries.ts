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
