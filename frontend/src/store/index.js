import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import country from './country'
import auth from './auth'

const reducer = combineReducers({country, auth})
const middleware = applyMiddleware(thunk, createLogger())
const store = createStore(reducer, middleware)

export default store
export * from './country'
export * from './auth'
