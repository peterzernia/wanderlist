import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import auth from './auth'
import country from './country'
import error from './error'
import modal from './modal'
import navbar from './navbar'
import tripReport from './tripReport'
import user from './user'

const reducer = combineReducers({auth, country, error, modal, navbar, tripReport, user})
const middleware = applyMiddleware(thunk, createLogger())
const store = createStore(reducer, middleware)

export default store
