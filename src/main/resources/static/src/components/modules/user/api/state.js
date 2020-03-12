import { isEmpty } from '../../../../helpers/isEmpty';

import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions';

export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
};

export default (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      };

    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };

    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      };

    default:
      return state;
  }
};
