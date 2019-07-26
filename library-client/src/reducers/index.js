import { combineReducers } from 'redux';
import data from './app'
import user from './user.reducer'

const rootReducer = combineReducers({ data, user })

export default rootReducer