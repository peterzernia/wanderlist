import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import * as Sentry from '@sentry/browser'
import store from './store/index'
import App from './App'
import * as serviceWorker from './serviceWorker'

Sentry.init({
  dsn: 'https://68ff1c6c1de146c28032e30632599ce0@sentry.io/1549105',
  environment: process.env.NODE_ENV,
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
)

serviceWorker.unregister()
