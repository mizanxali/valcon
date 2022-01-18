import {StyleSheet} from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
    height: '100%',
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
  videoWrapper: {
    width: '75%',
  },
  videoRow: {
    margin: 20,
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
    fontWeight: 'bold',
  },
});
