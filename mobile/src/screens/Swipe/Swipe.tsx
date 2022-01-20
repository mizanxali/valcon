import {useMutation, useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player';
import TinderCard from 'react-tinder-card';
import {RANKS} from '../../constants/ranks';
import {
  LEFT_SWIPE_MUTATION,
  RIGHT_SWIPE_MUTATION,
} from '../../graphql/mutations';
import {GET_PROFILES_QUERY} from '../../graphql/queries';
import theme from '../../theme';
import styles from './Swipe.style';

const SwipeScreen = () => {
  const {data, loading, error} = useQuery(GET_PROFILES_QUERY, {
    variables: {
      minRank: 0,
      maxRank: 21,
      servers: ['Mumbai'],
    },
  });

  const [leftSwipe] = useMutation(LEFT_SWIPE_MUTATION, {
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
  });

  const [rightSwipe] = useMutation(RIGHT_SWIPE_MUTATION, {
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
  });

  if (loading)
    return (
      <View style={styles.screen}>
        <Text>Loading swipes...</Text>
      </View>
    );

  if (data) {
    const profiles = [...data.getProfiles];

    const swipeHandler = (direction: string, swipedId: string) => {
      if (direction === 'right') {
        rightSwipe({
          variables: {
            rightSwipedID: swipedId,
          },
        });
      } else if (direction === 'left') {
        leftSwipe({
          variables: {
            leftSwipedID: swipedId,
          },
        });
      }
    };

    const cardLeftScreenHandler = (swipedId: any) => {
      //delete card
    };

    if (profiles.length === 0)
      return (
        <View style={styles.screen}>
          <Text>You ran out of potential profiles...</Text>
          <Text>Try changing your search filters.</Text>
        </View>
      );

    return (
      <View style={styles.screen}>
        <View style={styles.titleWrapper}>
          <Image
            style={styles.logo}
            source={require('../../../assets/img/valcon-logo.png')}
          />
          <Pressable onPress={() => console.log('settings')}>
            <MaterialIcons
              name="settings"
              size={30}
              color={theme.colors.white}
            />
          </Pressable>
        </View>
        <View style={styles.cardContainer}>
          {profiles.map((profile, i) => {
            const {
              user,
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
                onSwipe={dir => swipeHandler(dir, user)}
                onCardLeftScreen={() => cardLeftScreenHandler(user)}>
                <View style={styles.card}>
                  <Text style={styles.title}>{riotID}</Text>
                  <View style={styles.videoWrapper}>
                    <VideoPlayer
                      hideControlsOnStart
                      autoplay
                      loop
                      video={{
                        uri: clip,
                      }}
                      videoWidth={1600}
                      videoHeight={900}
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
