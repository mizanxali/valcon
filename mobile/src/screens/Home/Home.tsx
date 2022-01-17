import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../../types';
import styles from './Home.style';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;
