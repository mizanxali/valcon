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
  discoverableWarning: {
    marginHorizontal: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: theme.colors.grey,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  warningText: {
    width: '85%',
    color: theme.colors.white,
    fontSize: 12,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IGN: {
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
  valueNotSelected: {
    marginHorizontal: 12,
    marginVertical: 7,
    color: theme.colors.grey,
    fontSize: 16,
    fontWeight: '500',
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
  agentsNotSelected: {
    color: theme.colors.grey,
    fontSize: 16,
    fontWeight: '500',
  },
  videoWrapper: {
    marginHorizontal: 12,
    marginVertical: 7,
  },
});
