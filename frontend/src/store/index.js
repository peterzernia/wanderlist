import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import auth from './auth'
import country from './country'
import modal from './modal'
import navbar from './navbar'
import user from './user'


const reducer = combineReducers({auth, country, modal, navbar, user})
const middleware = applyMiddleware(thunk, createLogger())
const store = createStore(reducer, middleware)

export default store
