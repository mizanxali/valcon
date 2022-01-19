import {StyleSheet} from 'react-native';
import theme from '../../../theme';

export default StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
    height: '100%',
  },
  container: {
    paddingTop: 12,
    paddingHorizontal: 12,
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
  agentsField: {
    marginVertical: 7,
    marginHorizontal: 12,
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
    color: theme.colors.white,
    paddingHorizontal: 18,
    paddingVertical: 3,
    marginHorizontal: 3,
    borderRadius: 10,
    marginVertical: 4,
  },
});
