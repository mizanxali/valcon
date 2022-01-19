import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import {RANKS} from '../../../constants/ranks';
import {SwipeStackParamList} from '../../../types';
import styles from './FullProfile.style';

const FullProfile = ({navigation, route}: IFullProfileProps) => {
  const data = route.params.profile;
  let {riotID, clips, agents, favoriteMap, lookingToPlay, rank, server} = data;

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>{riotID} #???</Text>
        <View style={styles.videoWrapper}>
          <VideoPlayer
            hideControlsOnStart
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
        {clips[1] && (
          <View style={styles.videoWrapper}>
            <VideoPlayer
              video={{
                uri: clips[1],
              }}
              videoWidth={1600}
              videoHeight={900}
              thumbnail={require('../../../assets/img/valcon-thumbnail.png')}
              endThumbnail={require('../../../assets/img/valcon-thumbnail.png')}
            />
          </View>
        )}
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
        {clips[2] && (
          <View style={styles.videoWrapper}>
            <VideoPlayer
              video={{
                uri: clips[2],
              }}
              videoWidth={1600}
              videoHeight={900}
              thumbnail={require('../../../assets/img/valcon-thumbnail.png')}
              endThumbnail={require('../../../assets/img/valcon-thumbnail.png')}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

interface IFullProfileProps
  extends NativeStackScreenProps<SwipeStackParamList, 'FullProfile'> {}

export default FullProfile;
