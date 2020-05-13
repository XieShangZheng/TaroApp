import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import post from './post'
import users from './users'

export default combineReducers({
  counter,
  user,
  post,
  users,
})
