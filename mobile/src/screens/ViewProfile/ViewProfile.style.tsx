import {StyleSheet} from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
  },
  container: {
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IGN: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  agentsWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    padding: 12,
    margin: 12,
  },
  agent: {
    color: theme.colors.primary,
  },
  videoWrapper: {
    margin: 12,
  },
});
