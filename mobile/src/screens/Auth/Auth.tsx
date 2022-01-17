import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Button,
  GestureResponderEvent,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import theme from '../../theme';
import styles from './Auth.style';

const AuthScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Auth'>) => {
  const [isLogin, setIsLogin] = useState(true);

  function toggleLogin() {
    setIsLogin(!isLogin);
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Valcon</Text>
      <View style={styles.container}>
        <Header isLogin={isLogin} />
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text>Email</Text>
            <TextInput
              keyboardType="email-address"
              placeholder="johndoe@example.com"
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Password</Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <AuthButton isLogin={isLogin} />
          </View>
          <Footer isLogin={isLogin} toggleLogin={toggleLogin} />
        </View>
      </View>
    </View>
  );
};

const Header = ({isLogin}: IHeaderProps) => {
  return isLogin ? (
    <View>
      <Text style={styles.headerPrimaryText}>Welcome Back</Text>
      <Text style={styles.headerSecondaryText}>Let's sign you back in.</Text>
    </View>
  ) : (
    <View>
      <Text style={styles.headerPrimaryText}>Welcome</Text>
      <Text style={styles.headerSecondaryText}>Let's get you started.</Text>
    </View>
  );
};

const AuthButton = ({isLogin}: IAuthButtonProps) => {
  return isLogin ? (
    <View>
      <Button title="Sign In" onPress={() => {}} color={theme.colors.primary} />
    </View>
  ) : (
    <View>
      <Button title="Sign Up" onPress={() => {}} color={theme.colors.primary} />
    </View>
  );
};

const Footer = ({isLogin, toggleLogin}: IFooterProps) => {
  return isLogin ? (
    <Text onPress={toggleLogin} style={styles.footerText}>
      Don't have an account? Sign up.
    </Text>
  ) : (
    <Text onPress={toggleLogin} style={styles.footerText}>
      Already have an account? Sign In.
    </Text>
  );
};

interface IHeaderProps {
  isLogin: boolean;
}

interface IAuthButtonProps {
  isLogin: boolean;
}

interface IFooterProps {
  isLogin: boolean;
  toggleLogin: (event: GestureResponderEvent) => void;
}

export default AuthScreen;
