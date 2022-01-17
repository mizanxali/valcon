import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {AuthContext, AuthProvider} from './context/auth';
import AuthScreen from './screens/Auth/Auth';
import HomeScreen from './screens/Home/Home';
import {RootStackParamList} from './types';

const link = createHttpLink({
  uri: 'http://192.168.0.103:4000/graphql',
  headers: {
    accesstoken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUzMTg1YjJlNDgyZTg4YjA2MTUyZmEiLCJlbWFpbCI6InNleHlAb2suY29tIiwiY3JlYXRlZEF0IjoiMjAyMi0wMS0xNVQxODo1NDoxOS40MzhaIiwiaWF0IjoxNjQyNDU1NjM5LCJleHAiOjE2NDI4MTU2Mzl9.yG1yrCHHGQaGOvsVhoerI9bkIDF-xOx5k58Kkh_SKGk',
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          {/* <Redirect /> */}
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
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
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
};

export default App;
