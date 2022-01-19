import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import TinderCard from 'react-tinder-card';
import {RANKS} from '../../../constants/ranks';
import {SwipeStackParamList} from '../../../types';
import styles from './SwipeProfiles.style';

const SwipeProfiles = ({navigation, data}: ISwipeProfilesProps) => {
  const profiles = [...data, ...data, ...data];

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
          const {riotID, clips, favoriteMap, lookingToPlay, rank, server} =
            profile;

          return (
            <TinderCard
              key={i}
              preventSwipe={['up', 'down']}
              onSwipe={dir => swiped(dir, profile.riotID)}
              onCardLeftScreen={() => outOfFrame(profile.riotID)}>
              <Pressable
                onTouchStart={() => {
                  console.log('pressed');
                  navigation.navigate('FullProfile', {profile});
                }}>
                <View style={styles.card}>
                  <Text style={styles.title}>
                    {riotID ? `${riotID} #???` : 'Your Profile'}
                  </Text>
                  <View style={styles.videoWrapper}>
                    <VideoPlayer
                      hideControlsOnStart
                      autoplay
                      video={{
                        uri: clips[0],
                      }}
                      videoWidth={1600}
                      videoHeight={900}
                      thumbnail={require('../../../assets/img/valcon-thumbnail.png')}
                      endThumbnail={require('../../../assets/img/valcon-thumbnail.png')}
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
                </View>
              </Pressable>
            </TinderCard>
          );
        })}
      </View>
    </View>
  );
};

interface ISwipeProfilesProps
  extends NativeStackScreenProps<SwipeStackParamList, 'SwipeProfiles'> {
  data: any;
}

export default SwipeProfiles;
