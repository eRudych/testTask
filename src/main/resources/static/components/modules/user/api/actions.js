import axios from 'axios';
import cookie from 'js-cookie';

import { routesApi } from '../../../../routes/routeApi';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';

export const SET_USER = 'SET_USER';

export const LOGOUT = 'LOGOUT';

export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  return { type: SET_USER, user };
}

export function loginSetUserLocalStorageAndCookie(token, user) {
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('user', JSON.stringify(user));

  cookie.set('auth', { token, user }, { path: '/' });
}

export function logoutUnsetUserLocalStorageAndCookie() {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');

  cookie.remove('auth');
}

export function login(userCredentials) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading: true
    });

    return axios
      .post(`${routesApi}/auth/login`, userCredentials, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        let error = '';

        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message;
        } else if (response.data.data.userLogin.token !== '') {
          const { token } = response.data.data.userLogin;
          const { user } = response.data.data.userLogin;

          dispatch(setUser(token, user));

          loginSetUserLocalStorageAndCookie(token, user);
        }

        dispatch({
          type: LOGIN_RESPONSE,
          error
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        });
      });
  };
}

export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie();

    dispatch({
      type: LOGOUT
    });
  };
}

export function signup(userCredentials) {
  return () => {
    return axios.post(`${routesApi}/auth/signup`, userCredentials, {
      headers: { 'Content-Type': 'application/json' }
    });
  };
}
