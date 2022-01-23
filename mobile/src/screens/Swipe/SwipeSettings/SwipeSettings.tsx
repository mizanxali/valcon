import {useQuery} from '@apollo/client';
import {Slider} from '@miblanchard/react-native-slider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';
import {RANKS} from '../../../constants/ranks';
import {ME_QUERY} from '../../../graphql/queries';
import theme from '../../../theme';
import {SwipeStackParamList} from '../../../types';
import styles from './SwipeSettings.style';

const SwipeSettingsScreen = ({
  navigation,
  editSettings,
}: ISwipeSettingsProps) => {
  const [minRank, setMinRank] = useState(0);
  const [maxRank, setMaxRank] = useState(21);

  const {data, loading, error} = useQuery(ME_QUERY, {
    onCompleted(data) {
      setMinRank(data.me.minRank);
      setMaxRank(data.me.maxRank);
    },
  });

  function onSaveHandler() {
    editSettings(minRank, maxRank);
    navigation.goBack();
  }

  if (loading)
    return (
      <View style={styles.screen}>
        <ActivityIndicator />
      </View>
    );

  if (data) {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Min Rank</Text>
            <Slider
              thumbTintColor={theme.colors.white}
              value={minRank}
              onValueChange={value => {
                if (typeof value === 'number') setMinRank(value);
                else setMinRank(value[0]);
              }}
              minimumValue={0}
              maximumValue={21}
              step={1}
            />
            <Text style={styles.inputValue}>{RANKS[minRank]}</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Max Rank</Text>
            <Slider
              thumbTintColor={theme.colors.white}
              value={maxRank}
              onValueChange={value => {
                if (typeof value === 'number') setMaxRank(value);
                else setMaxRank(value[0]);
              }}
              minimumValue={0}
              maximumValue={21}
              step={1}
            />
            <Text style={styles.inputValue}>{RANKS[maxRank]}</Text>
          </View>
          <View style={styles.saveButton}>
            <Button
              title="Save"
              onPress={onSaveHandler}
              color={theme.colors.primary}
            />
          </View>
        </View>
      </View>
    );
  }

  return null;
};

interface ISwipeSettingsProps
  extends NativeStackScreenProps<SwipeStackParamList, 'SwipeSettings'> {
  editSettings: any;
}

export default SwipeSettingsScreen;
