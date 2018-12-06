import axios from 'axios'
import { fetchUser } from './userActions'
import { fetchUserTripReports } from './tripReportActions'

// Authentication actions
export const authStart = () => {
  return {
    type: "AUTH_START"
  }
}

export const authSuccess = token => {
  return {
    type: "AUTH_SUCCESS",
    token: token
  }
}

export const authFail = () => {
  return {
    type: "AUTH_FAIL"
  }
}

/*
The token stored in localStorage to authenticate the user is removed, logging
the user out.
*/
export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
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
    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rest-auth/login/`, {
      username: username,
      password: password
    })
      .then(response => {
        const token = response.data.key;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        dispatch(authSuccess(token));
        dispatch(fetchUser());
        dispatch(fetchUserTripReports(username));
      })
      .catch(err => {
        dispatch(authFail());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}

/*
Similar to login, registers a user with the Django REST API which returns a
token to authenticate the user. This token is stored in localStorage.
*/
export const authRegister = (username, email, password1, password2, home) => {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch(authStart());
    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rest-auth/registration/`, {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
      home: home
    })
      .then(response => {
        const token = response.data.key;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        dispatch(authSuccess(token));
        dispatch(fetchUser());
        dispatch({type: "ADD_SUCCESS", success: 'You have successfully registered.'});
      })
      .catch(err => {
        dispatch(authFail());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}

/*
Checks to see if the authentication token exists in localStorage. If a token
exists, it runs the login function. If no token exits it runs the logout
function.
*/
export const authCheckState = () => {
  const token = localStorage.getItem('token');
  return dispatch => {
    if (token === null) {
      dispatch(authLogout());
    } else {
      dispatch(authSuccess(token));
    }
  }
}

/*
The users email is posted to the Django url, which then sends an email with a
link where the user can reset their password. Since the state is not changing,
there is no need to dispatch any actions other than those related to success
and errors.
*/
export const requestPasswordReset = (email) => {
  return dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rest-auth/password/reset/`, {
      email: email,
    })
      .then(response => {
        dispatch({type: "ADD_SUCCESS", success: 'An email has been sent with instructions.'});
      })
      .catch(err => {
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}
