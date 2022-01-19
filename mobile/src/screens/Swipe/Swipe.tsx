import {useQuery} from '@apollo/client';
import React from 'react';
import {Text, View} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import TinderCard from 'react-tinder-card';
import {RANKS} from '../../constants/ranks';
import {GET_PROFILES_QUERY} from '../../graphql/queries';
import styles from './Swipe.style';

const SwipeScreen = () => {
  const {data, loading, error} = useQuery(GET_PROFILES_QUERY, {
    variables: {
      minRank: 0,
      maxRank: 21,
      servers: ['Mumbai'],
    },
  });

  if (loading)
    return (
      <View style={styles.screen}>
        <Text>Loading swipes...</Text>
      </View>
    );

  if (data) {
    const profiles = [
      ...data.getProfiles,
      ...data.getProfiles,
      ...data.getProfiles,
    ];

    const swiped = (direction: any, nameToDelete: any) => {
      console.log('removing: ' + nameToDelete);
    };

    const outOfFrame = (name: any) => {
      console.log(name + ' left the screen!');
    };

    return (
      <View style={styles.screen}>
        <Text>Swipe</Text>
        <View style={styles.CardContainer}>
          {profiles.map((profile, i) => {
            const {
              riotID,
              clip,
              favoriteMap,
              lookingToPlay,
              rank,
              server,
              agents,
            } = profile;

            return (
              <TinderCard
                key={i}
                preventSwipe={['up', 'down']}
                onSwipe={dir => swiped(dir, profile.riotID)}
                onCardLeftScreen={() => outOfFrame(profile.riotID)}>
                <View style={styles.card}>
                  <Text style={styles.title}>
                    {riotID ? `${riotID} #???` : 'Your Profile'}
                  </Text>
                  <View style={styles.videoWrapper}>
                    <VideoPlayer
                      hideControlsOnStart
                      autoplay
                      video={{
                        uri: clip,
                      }}
                      videoWidth={1600}
                      videoHeight={900}
                      thumbnail={require('../../assets/img/valcon-thumbnail.png')}
                      endThumbnail={require('../../assets/img/valcon-thumbnail.png')}
                    />
                  </View>
                  <View style={styles.profileField}>
                    <Text style={styles.heading}>Rank</Text>
                    <Text style={styles.value}>{RANKS[rank]}</Text>
                  </View>
                  <View style={styles.profileField}>
                    <Text style={styles.heading}>Server</Text>
                    <Text style={styles.value}>{server}</Text>
                  </View>
                  <View style={styles.profileField}>
                    <Text style={styles.heading}>Looking to play</Text>
                    <Text style={styles.value}>{lookingToPlay}</Text>
                  </View>
                  <View style={styles.profileField}>
                    <Text style={styles.heading}>Favorite map</Text>
                    <Text style={styles.value}>{favoriteMap}</Text>
                  </View>
                  <View style={styles.agentsField}>
                    <Text style={styles.heading}>Agents</Text>
                    <View style={styles.agentsWrapper}>
                      {agents.map((agent: string, i: number) => (
                        <Text style={styles.agent} key={i}>
                          {agent}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
              </TinderCard>
            );
          })}
        </View>
      </View>
    );
  }

  return null;
};

export default SwipeScreen;
