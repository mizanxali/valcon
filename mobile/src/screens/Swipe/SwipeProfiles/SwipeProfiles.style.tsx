import {StyleSheet} from 'react-native';
import theme from '../../../theme';

export default StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
    height: '100%',
  },
  CardContainer: {
    width: '95%',
  },
  card: {
    position: 'absolute',
    backgroundColor: theme.colors.grey,
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
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginVertical: 7,
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
    fontWeight: '600',
  },
  value: {
    marginHorizontal: 12,
    marginVertical: 7,
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  videoWrapper: {
    marginHorizontal: 12,
    marginVertical: 7,
  },
});
