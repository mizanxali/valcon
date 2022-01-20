import {StyleSheet} from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  titleWrapper: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  cardContainer: {
    width: '90%',
  },
  card: {
    position: 'absolute',
    backgroundColor: theme.colors.surface,
    width: '100%',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: 'cover',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  cardText: {
    color: 'black',
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: '500',
    marginHorizontal: 12,
    marginVertical: 7,
    fontFamily: 'FiraSans-Bold',
  },
  profileField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 1,
  },
  heading: {
    color: theme.colors.primary,
    fontSize: 16,
    fontFamily: 'FiraSans-Medium',
  },
  value: {
    marginHorizontal: 12,
    marginVertical: 7,
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: 'FiraSans-Medium',
  },
  videoWrapper: {
    marginHorizontal: 12,
    marginVertical: 7,
  },
  agentsField: {
    marginVertical: 7,
    marginHorizontal: 12,
  },
  agentsWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    padding: 12,
    marginVertical: 7,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  agent: {
    backgroundColor: theme.colors.grey,
    fontSize: 14,
    fontFamily: 'FiraSans-Medium',
    color: theme.colors.white,
    paddingHorizontal: 18,
    paddingVertical: 3,
    marginHorizontal: 3,
    borderRadius: 10,
    marginVertical: 3,
  },
});
