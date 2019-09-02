import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import * as Sentry from '@sentry/browser'
import store from './store/index'
import App from './App'
import * as serviceWorker from './serviceWorker'

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_HOST,
  environment: process.env.NODE_ENV,
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
)

serviceWorker.unregister()
