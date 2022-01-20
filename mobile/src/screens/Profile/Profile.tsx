import {useQuery} from '@apollo/client';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {GET_PROFILE_QUERY} from '../../graphql/queries';
import {ProfileStackParamList} from '../../types';
import EditProfile from './EditProfile/EditProfile';
import ViewProfile from './ViewProfile/ViewProfile';
import styles from './Profile.style';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileScreen = () => {
  const {data, loading, error} = useQuery(GET_PROFILE_QUERY);

  if (loading)
    return (
      <View style={styles.screen}>
        <ActivityIndicator />
      </View>
    );

  if (data)
    return (
      <Stack.Navigator>
        <Stack.Screen name="ViewProfile" options={{headerShown: false}}>
          {props => <ViewProfile {...props} data={data.getProfile} />}
        </Stack.Screen>
        <Stack.Screen name="EditProfile" options={{headerShown: false}}>
          {props => <EditProfile {...props} data={data.getProfile} />}
        </Stack.Screen>
      </Stack.Navigator>
    );

  return (
    <View style={styles.screen}>
      <Text>Something went wrong.</Text>
    </View>
  );
};

export default ProfileScreen;
