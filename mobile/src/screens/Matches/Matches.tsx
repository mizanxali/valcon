import {useQuery} from '@apollo/client';
import React from 'react';
import {View, Text, ActivityIndicator, FlatList, Image} from 'react-native';
import {GET_MATCHES_QUERY} from '../../graphql/queries';
import styles from './Matches.style';

const MatchesScreen = () => {
  const {data, loading, error} = useQuery(GET_MATCHES_QUERY);

  if (loading)
    return (
      <View style={styles.screen}>
        <ActivityIndicator />
      </View>
    );

  if (data) {
    const matches = data.getMatches;

    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>Matches</Text>
          <View style={styles.matchesListViewWrapper}>
            {matches.length ? (
              <FlatList
                data={[
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                  ...matches,
                ]}
                renderItem={MatchCard}
              />
            ) : (
              <Text>No matches</Text>
            )}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Something went wrong.</Text>
    </View>
  );
};

function MatchCard({item}: any) {
  const {_id, riotID, tagline} = item;
  return (
    <View style={styles.matchCard}>
      <View style={styles.logoWrapper}>
        <Image
          style={styles.logo}
          source={require('../../../assets/img/valcon-logo.png')}
        />
      </View>
      <View style={styles.matchIGN}>
        <Text style={styles.matchRiotID}>{riotID}</Text>
        <Text style={styles.matchTagline}>#{tagline}</Text>
      </View>
    </View>
  );
}

export default MatchesScreen;
