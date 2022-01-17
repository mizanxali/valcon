import {useQuery} from '@apollo/client';
import React from 'react';
import {Text, View} from 'react-native';
import {GET_PROFILE_QUERY} from '../../graphql/queries';
import styles from './Profile.style';

const ProfileScreen = () => {
  const {data, loading, error} = useQuery(GET_PROFILE_QUERY);

  if (data) {
    const {
      riotID,
      tagline,
      clips,
      discoverable,
      agents,
      favoriteMap,
      lookingToPlay,
      rank,
      server,
    } = data;

    return (
      <View style={styles.screen}>
        <Text>Profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Loading Profile</Text>
    </View>
  );
};

export default ProfileScreen;
