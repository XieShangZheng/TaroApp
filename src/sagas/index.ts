
import { fork, all } from 'redux-saga/effects'
 
import { watchLogin } from './user'
 
export default function* rootSaga() {
  yield all([
    fork(watchLogin)
  ])
}
