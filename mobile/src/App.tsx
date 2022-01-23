import {
  ApolloClient,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {AuthContext, AuthProvider} from './context/auth';
import AuthScreen from './screens/Auth/Auth';
import HomeScreen from './screens/Home/Home';
import {RootStackParamList} from './types';
import {getData} from './utils/asyncStorage';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const httpLink = new HttpLink({uri: 'http://192.168.0.103:4000/graphql'});

  const authHeader = setContext(
    request =>
      new Promise((success, fail) => {
        getData('token').then(token =>
          success({headers: {accesstoken: token}}),
        );
      }),
  );

  const client = new ApolloClient({
    link: concat(authHeader, httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          <Redirect />
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
};

const Redirect = () => {
  const context = useContext(AuthContext);

  if (context.user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
};

export default App;
