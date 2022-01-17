import {StyleSheet} from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
    height: '100%',
  },
  tabBar: {
    backgroundColor: theme.colors.background,
    borderTopWidth: 0,
  },
});
