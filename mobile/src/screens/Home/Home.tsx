import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../theme';
import {RootStackParamList} from '../../types';
import MatchesScreen from '../Matches/Matches';
import ProfileScreen from '../Profile/Profile';
import SwipeScreen from '../Swipe/Swipe';
import styles from './Home.style';

const Tab = createBottomTabNavigator();

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  return (
    <View style={styles.screen}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === 'Profile') {
              iconName = 'account-circle';
            } else if (route.name === 'Swipe') {
              iconName = 'swipe';
            } else if (route.name === 'Matches') {
              iconName = 'chat';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        })}>
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Swipe"
          component={SwipeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Matches"
          component={MatchesScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default HomeScreen;
