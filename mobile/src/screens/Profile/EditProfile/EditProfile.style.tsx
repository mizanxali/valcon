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
    color: theme.colors.primary,
    fontSize: 16,
    fontFamily: 'FiraSans-Medium',
  },
  input: {
    height: 40,
    padding: 10,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.white,
    marginTop: 7,
    fontFamily: 'FiraSans-Medium',
  },
  clipsContainer: {
    marginHorizontal: 12,
    marginVertical: 7,
  },
  videoWrapper: {
    width: '80%',
  },
  videoRow: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addVideoCard: {
    margin: 20,
    height: 50,
    backgroundColor: theme.colors.grey,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addVideoText: {
    color: theme.colors.white,
    fontSize: 15,
    fontFamily: 'FiraSans-Medium',
  },
});
