import {StyleSheet} from 'react-native';
import theme from '../../../theme';

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
    marginVertical: 7,
  },
  inputGroup: {
    marginHorizontal: 12,
    marginVertical: 7,
  },
  inputLabel: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: 'FiraSans-Medium',
  },
  inputValue: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: 'FiraSans',
    textAlign: 'center',
  },
  saveButton: {
    marginHorizontal: 12,
    marginVertical: 16,
  },
});
