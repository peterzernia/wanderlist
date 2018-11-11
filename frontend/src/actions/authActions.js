import axios from 'axios'
import { fetchUser } from './userActions'

export const authStart = () => {
  return {
    type: "AUTH_START"
  }
}

export const authSucess = token => {
  return {
    type: "AUTH_SUCESS",
    token: token
  }
}

export const authFail = error => {
  return {
    type: "AUTH_FAIL",
    error: error
  }
}

/*
The token stored in localStorage to authenticate the user is removed, logging
the user out.
*/
export const authLogout = () => {
  localStorage.removeItem('token');
  return {
    type: "AUTH_LOGOUT"
  }
}

/*
Logs user in using axios and recieves a token from the Django API. This token
is stored in localStorage.
*/
export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://localhost:8000/api/v1/rest-auth/login/', {
      username: username,
      password: password
    })
      .then(response => {
        const token = response.data.key;
        localStorage.setItem('token', token);
        dispatch(authSucess(token));
        dispatch(fetchUser());
      })
      .catch(err => {
        dispatch(authFail(err));
      })
  }
}

/*
Similar to login, registers a user with the Django REST API which returns a
token to authenticate the user. This token is stored in localStorage.
*/
export const authRegister = (username, email, password1, password2) => {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch(authStart());
    axios.post('http://localhost:8000/api/v1/rest-auth/registration/', {
      username: username,
      email: email,
      password1: password1,
      password2: password2
    })
      .then(response => {
        const token = response.data.key;
        localStorage.setItem('token', token);;
        dispatch(authSucess(token));
        dispatch(fetchUser());
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
}

/*
Checks to see if the authentication token exists in localStorage. If a token
exists, it runs the login function. If no token exits it runs the logout
function.
*/
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token === null) {
      dispatch(authLogout());
    } else {
      dispatch(authSucess(token));
    }
  }
}
