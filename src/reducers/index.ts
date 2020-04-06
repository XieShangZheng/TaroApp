import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import post from './post'

export default combineReducers({
  counter,
  user,
  post,
})
