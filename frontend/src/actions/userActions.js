export function login(username, password) {
  const url = `http://localhost:8000/api/v1/rest-auth/login`
  store.dispatch((dispatch, query) => {
    dispatch({type: "LOGIN_REQUEST"})
    axios.get(url)
      .then((response) => {
        dispatch({type: "LOGIN_SUCESS", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "LOGIN_REJECTED", payload: err})
      })
  })
}
