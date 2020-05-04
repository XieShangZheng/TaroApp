import Taro from '@tarojs/taro';
import { call, put, take, fork } from 'redux-saga/effects';
// call：在 saga 函数中调用其他异步/同步函数，获取结果
// put：类似 dispatch，用于在 saga 函数中发起 action
// take：在 saga 函数中监听 action，并获取对应 action 所携带的数据
// fork：在 saga 函数中无阻塞的调用 handlerSaga，即调用之后，不会阻塞后续的执行逻辑。

import { userApi } from '../api';
import { SET_LOGIN_INFO, LOGIN_SUCCESS, LOGIN, LOGIN_ERROR } from '../constants';

/***************************** 登录逻辑开始 ************************************/

function* login(userInfo) {
	try {
		const user = yield call(userApi.login, userInfo);

		// 将用户信息缓存在本地
		yield Taro.setStorage({ key: 'userInfo', data: user });

		// 其实以下三步可以合成一步，但是这里为了讲解清晰，将它们拆分成独立的单元

		// 发起登录成功的 action
		yield put({ type: LOGIN_SUCCESS });

		// 更新 Redux store 数据
		yield put({
			type: SET_LOGIN_INFO,
			payload: { ...user },
		});

		// 提示登录成功
		Taro.atMessage({ type: 'success', message: '恭喜您！登录成功！' });
	} catch (err) {
		console.log('login ERR: ', err);

		// 登录失败，发起失败的 action
		yield put({ type: LOGIN_ERROR });

		// 提示登录失败
		Taro.atMessage({ type: 'error', message: '很遗憾！登录失败！' });
	}
}

function* watchLogin() {
	while (true) {
		const { payload } = yield take(LOGIN);

		console.log('payload', payload);

		yield fork(login, payload.userInfo);
	}
}

/***************************** 登录逻辑结束 ************************************/

// eslint-disable-next-line import/prefer-default-export
export { watchLogin };
