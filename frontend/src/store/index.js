import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import country from './country'

const reducer = combineReducers({country, })
const middleware = applyMiddleware(thunk, createLogger())
const store = createStore(reducer, middleware)

export default store
export * from './country'
