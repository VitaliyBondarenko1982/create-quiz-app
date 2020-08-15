import axios from 'axios';
import { Dispatch } from 'redux';
import { AUTH_LOGOUT, AUTH_SUCCESS} from './actionTypes';

export const authSuccess = (token: string) => ({
  type: AUTH_SUCCESS,
  token,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT,
  };
};

export const autoLogout = (time: number) => {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
};

export const autoLogin = () => {
  return (dispatch: Dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(Number(localStorage.getItem('expirationDate')));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000);
      }
    }
  };
};

export const auth = (email: string, password: string, isLogin: boolean) => {
  return async (dispatch: Dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZ13ZcvnKFi14thxo55kh61gl0jvIVQaw';

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZ13ZcvnKFi14thxo55kh61gl0jvIVQaw';
    }

    const response = await axios.post(url, authData);
    const { data } = response;

    const experationDate = String(new Date(new Date().getTime() + data.expiresIn * 1000));

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', experationDate);

    dispatch(authSuccess(data.idToken));
    autoLogout(data.expiresIn);
  };
};
