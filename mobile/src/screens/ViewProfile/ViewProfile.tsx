import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player';
import theme from '../../theme';
import {ProfileStackParamList} from '../../types';
import {RANKS} from '../../constants/ranks';
import styles from './ViewProfile.style';

const ViewProfile = ({navigation, data}: IViewProfileProps) => {
  let {
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
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        {!discoverable && (
          <View style={styles.discoverableWarning}>
            <MaterialIcons name="warning" size={26} />
            <Text style={styles.warningText}>
              You are not currenlty discoverable. Complete your profile to start
              showing up for other users.
            </Text>
          </View>
        )}
        <View style={styles.titleWrapper}>
          <Text style={styles.IGN}>
            {riotID ? `${riotID} #${tagline}` : 'Your Profile'}
          </Text>
          <Pressable onPress={() => navigation.navigate('EditProfile')}>
            <MaterialIcons name="edit" size={24} color={theme.colors.white} />
          </Pressable>
        </View>
        {clips[0] && (
          <View style={styles.videoWrapper}>
            <VideoPlayer
              video={{
                uri: clips[0],
              }}
              videoWidth={1600}
              videoHeight={900}
              thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
            />
          </View>
        )}
        <View style={styles.profileField}>
          <Text style={styles.heading}>Rank</Text>
          {rank ? (
            <Text style={styles.value}>{RANKS[rank]}</Text>
          ) : (
            <Text style={styles.valueNotSelected}>Not selected</Text>
          )}
        </View>
        <View style={styles.profileField}>
          <Text style={styles.heading}>Server</Text>
          {server ? (
            <Text style={styles.value}>{server}</Text>
          ) : (
            <Text style={styles.valueNotSelected}>Not selected</Text>
          )}
        </View>
        <View style={styles.profileField}>
          <Text style={styles.heading}>Looking to play</Text>
          {lookingToPlay ? (
            <Text style={styles.value}>{lookingToPlay}</Text>
          ) : (
            <Text style={styles.valueNotSelected}>Not selected</Text>
          )}
        </View>
        <View style={styles.profileField}>
          <Text style={styles.heading}>Favorite map</Text>
          {favoriteMap ? (
            <Text style={styles.value}>{favoriteMap}</Text>
          ) : (
            <Text style={styles.valueNotSelected}>Not selected</Text>
          )}
        </View>
        {clips[1] && (
          <View style={styles.videoWrapper}>
            <VideoPlayer
              video={{
                uri: clips[1],
              }}
              videoWidth={1600}
              videoHeight={900}
              thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
            />
          </View>
        )}
        <View style={styles.agentsField}>
          <Text style={styles.heading}>Agents</Text>
          <View style={styles.agentsWrapper}>
            {agents.length ? (
              agents.map((agent: string, i: number) => (
                <Text style={styles.agent} key={i}>
                  {agent}
                </Text>
              ))
            ) : (
              <Text style={styles.agentsNotSelected}>No agents selected.</Text>
            )}
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
              thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

interface IViewProfileProps
  extends NativeStackScreenProps<ProfileStackParamList, 'ViewProfile'> {
  data: any;
}

export default ViewProfile;
