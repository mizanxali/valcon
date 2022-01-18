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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUzMTc1YjMyODAyNjkyNTA3Y2ZmM2MiLCJlbWFpbCI6Im9rQG9rLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDEtMTVUMTg6NTA6MDMuMzAxWiIsImlhdCI6MTY0MjUyNzgzNCwiZXhwIjoxNjQyODg3ODM0fQ.1BZOsB5KD3kMP8izx4QNDG3pRBJRGSvTUksPrW8idlw',
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
