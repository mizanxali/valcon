import {useMutation, useQuery} from '@apollo/client';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {EDIT_USER_MUTATION} from '../../graphql/mutations';
import {GET_PROFILES_QUERY} from '../../graphql/queries';
import {SwipeStackParamList} from '../../types';
import styles from './Swipe.style';
import SwipesScreen from './Swipes/Swipes';
import SwipeSettingsScreen from './SwipeSettings/SwipeSettings';

const Stack = createNativeStackNavigator<SwipeStackParamList>();

const ProfileScreen = () => {
  const {data, loading, error} = useQuery(GET_PROFILES_QUERY);

  const [editUser] = useMutation(EDIT_USER_MUTATION, {
    onError(err) {
      console.log(err.message);
    },
    refetchQueries: [GET_PROFILES_QUERY],
  });

  function applyFilters(minRank: number, maxRank: number) {
    editUser({
      variables: {
        minRank,
        maxRank,
      },
    });
  }

  if (loading)
    return (
      <View style={styles.screen}>
        <ActivityIndicator />
      </View>
    );

  if (data)
    return (
      <Stack.Navigator>
        <Stack.Screen name="Swipes" options={{headerShown: false}}>
          {props => <SwipesScreen {...props} data={data.getProfiles} />}
        </Stack.Screen>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="SwipeSettings" options={{headerShown: false}}>
            {props => (
              <SwipeSettingsScreen {...props} editSettings={applyFilters} />
            )}
          </Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    );

  if (error) console.log(error);

  return (
    <View style={styles.errorScreen}>
      <Text>Something went wrong.</Text>
    </View>
  );
};

export default ProfileScreen;
