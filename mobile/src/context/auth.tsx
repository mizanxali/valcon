import jwt_decode, {JwtPayload} from 'jwt-decode';
import React, {createContext, useReducer} from 'react';
import {getData, removeData, storeData} from '../utils/asyncStorage';

const initialState: IAuthState = {
  user: null,
};

getData('token').then(token => {
  if (token) {
    const decodedToken = jwt_decode<JwtPayload>(token);
    if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
      removeData('token');
    } else {
      initialState.user = token;
    }
  }
});

const AuthContext = createContext({
  user: null,
  login: (token: string) => {},
  logout: () => {},
});

function authReducer(state: IAuthState, action: any) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (token: string) => {
    // store token in local storage
    storeData('token', token);

    dispatch({
      type: 'LOGIN',
      payload: token,
    });
  };

  const logout = () => {
    // remove token from local storage
    removeData('token');

    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login: login,
        logout: logout,
      }}
      {...props}
    />
  );
}

interface IAuthState {
  user: null | string;
}

export {AuthContext, AuthProvider};
