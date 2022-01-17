import {StyleSheet} from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
    height: '100%',
  },
  title: {
    color: theme.colors.primary,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  gif: {
    width: 480,
    height: 270,
  },
  container: {
    padding: 30,
    height: '100%',
  },
  headerPrimaryText: {
    color: theme.colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerSecondaryText: {
    color: theme.colors.white,
    fontSize: 25,
    fontWeight: '300',
  },
  form: {
    marginVertical: 20,
  },
  inputGroup: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    padding: 10,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  footerText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: '200',
    textAlign: 'center',
    marginVertical: 10,
  },
});
