import {useQuery} from '@apollo/client';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {GET_PROFILES_QUERY} from '../../graphql/queries';
import {SwipeStackParamList} from '../../types';
import FullProfile from './FullProfile/FullProfile';
import SwipeProfiles from './SwipeProfiles/SwipeProfiles';
import styles from './Swipe.style';

const Stack = createNativeStackNavigator<SwipeStackParamList>();

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
    return (
      <Stack.Navigator>
        <Stack.Screen name="SwipeProfiles" options={{headerShown: false}}>
          {props => <SwipeProfiles {...props} data={data.getProfiles} />}
        </Stack.Screen>
        <Stack.Screen name="FullProfile" options={{headerShown: false}}>
          {props => <FullProfile {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return null;
};

export default SwipeScreen;
