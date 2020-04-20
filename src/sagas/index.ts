
import { fork, all } from 'redux-saga/effects'
 
import { watchLogin } from './user'
import { watchCreatePost } from './post'
 
export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchCreatePost)
  ])
}
