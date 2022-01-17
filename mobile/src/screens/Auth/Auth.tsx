import {useMutation} from '@apollo/client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {CREATE_USER_MUTATION, LOGIN_MUTATION} from '../../graphql/mutations';
import theme from '../../theme';
import {RootStackParamList} from '../../types';
import styles from './Auth.style';

const AuthScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Auth'>) => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signIn] = useMutation(LOGIN_MUTATION, {
    update(_, result) {
      console.log(result);
      navigation.replace('Home');
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
    variables: {
      email,
      password,
    },
  });

  const [signUp] = useMutation(CREATE_USER_MUTATION, {
    update(proxy, result) {
      console.log(result);
      navigation.navigate('Home');
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
    variables: {
      email,
      password,
    },
  });

  function toggleLogin() {
    setIsLogin(!isLogin);
  }

  function onSignUpHandler() {
    console.log('button pressed');
    signUp();
  }

  function onSignInHandler() {
    console.log('button pressed');
    signIn();
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
              value={email}
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
              placeholder="johndoe@example.com"
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Password</Text>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <AuthButton
              isLogin={isLogin}
              onSignUpHandler={onSignUpHandler}
              onSignInHandler={onSignInHandler}
            />
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

const AuthButton = ({
  isLogin,
  onSignInHandler,
  onSignUpHandler,
}: IAuthButtonProps) => {
  return isLogin ? (
    <View>
      <Button
        title="Sign In"
        onPress={onSignInHandler}
        color={theme.colors.primary}
      />
    </View>
  ) : (
    <View>
      <Button
        title="Sign Up"
        onPress={onSignUpHandler}
        color={theme.colors.primary}
      />
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
  onSignUpHandler: any;
  onSignInHandler: any;
}

interface IFooterProps {
  isLogin: boolean;
  toggleLogin: any;
}

export default AuthScreen;
