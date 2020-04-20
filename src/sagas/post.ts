import Taro from '@tarojs/taro'
import { call, put, take, fork } from 'redux-saga/effects'

import { postApi } from '../api'

import {
  CREATE_POST,
  POST_SUCCESS,
  POST_ERROR,
  SET_POSTS,
  SET_POST_FORM_IS_OPENED,
} from '../constants'

function* createPost(postData, userId) {
  try {
    const post = yield call(postApi.createPost, postData, userId)

    // 其实以下三步可以合成一步，但是这里为了讲解清晰，将它们拆分成独立的单元

    // 发起发帖成功的 action
    yield put({ type: POST_SUCCESS })

    // 关闭发帖框弹出层
    yield put({ type: SET_POST_FORM_IS_OPENED, payload: { isOpened: false } })

    // 更新 Redux store 数据
    yield put({
      type: SET_POSTS,
      payload: {
        posts: [post],
      },
    })

    // 提示发帖成功
    Taro.atMessage({
      message: '发表文章成功',
      type: 'success',
    })
  } catch (err) {
    console.log('createPost ERR: ', err)

    // 发帖失败，发起失败的 action
    yield put({ type: POST_ERROR })

    // 提示发帖失败
    Taro.atMessage({
      message: '发表文章失败',
      type: 'error',
    })
  }
}

function* watchCreatePost() {
  while (true) {
    const { payload } = yield take(CREATE_POST)

    console.log('payload', payload)

    yield fork(createPost, payload.postData, payload.userId)
  }
}

export { watchCreatePost }
