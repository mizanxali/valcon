import {StyleSheet} from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
    minHeight: '100%',
  },
  container: {
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    fontFamily: 'FiraSans-Bold',
    marginHorizontal: 12,
    marginTop: 7,
    marginBottom: 3,
  },
  description: {
    color: theme.colors.white,
    fontSize: 14,
    fontFamily: 'FiraSans',
    marginHorizontal: 12,
    marginBottom: 7,
    marginTop: 3,
  },
  matchesListViewWrapper: {},
  matchCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoWrapper: {
    backgroundColor: theme.colors.black,
    width: 60,
    height: 60,
    borderRadius: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  matchIGN: {},
  matchRiotID: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: 'FiraSans-Bold',
  },
  matchTagline: {
    color: theme.colors.grey,
    fontSize: 16,
    fontFamily: 'FiraSans',
  },
  errorScreen: {
    backgroundColor: theme.colors.background,
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
