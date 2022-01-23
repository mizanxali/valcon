import {useMutation} from '@apollo/client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player';
import TinderCard from 'react-tinder-card';
import {RANKS} from '../../../constants/ranks';
import {
  LEFT_SWIPE_MUTATION,
  RIGHT_SWIPE_MUTATION,
} from '../../../graphql/mutations';
import theme from '../../../theme';
import {SwipeStackParamList} from '../../../types';
import styles from './Swipes.style';

const SwipesScreen = ({navigation, data: profiles}: ISwipesProps) => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

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

  const swipeHandler = (direction: string, swipedId: string) => {
    setCurrentProfileIndex(currentProfileIndex + 1);

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
        <View style={styles.titleWrapper}>
          <Image
            style={styles.logo}
            source={require('../../../../assets/img/valcon-logo.png')}
          />
          <Pressable onPress={() => navigation.navigate('SwipeSettings')}>
            <MaterialIcons
              name="settings"
              size={30}
              color={theme.colors.white}
            />
          </Pressable>
        </View>
        <View style={styles.emptyProfileScreen}>
          <Text style={styles.emptyProfileText}>
            You ran out of potential profiles...
          </Text>
          <Text style={styles.emptyProfileText}>
            Make sure you have completed setting up your profile and try
            changing your search filters from the settings above.
          </Text>
        </View>
      </View>
    );

  return (
    <View style={styles.screen}>
      <View style={styles.titleWrapper}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/img/valcon-logo.png')}
        />
        <Pressable onPress={() => navigation.navigate('SwipeSettings')}>
          <MaterialIcons name="settings" size={30} color={theme.colors.white} />
        </Pressable>
      </View>
      <View style={styles.cardContainer}>
        {profiles.map((profile: any, i: number) => {
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
                  {currentProfileIndex === profiles.length - i - 1 && (
                    <VideoPlayer
                      loop
                      repeat
                      hideControlsOnStart
                      video={{
                        uri: clip,
                      }}
                      videoWidth={1600}
                      videoHeight={900}
                      autoplay
                    />
                  )}
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
};

interface ISwipesProps
  extends NativeStackScreenProps<SwipeStackParamList, 'Swipes'> {
  data: any;
}

export default SwipesScreen;
