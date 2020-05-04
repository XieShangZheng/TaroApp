import {
	SET_LOGIN_INFO,
	LOGIN_SUCCESS,
	LOGIN,
	LOGIN_ERROR,
	LOGIN_NORMAL,
	SET_LOGIN_OUT,
} from '../constants/';

const INITIAL_STATE = {
	userId: '',
	avatar: '',
	nickName: '',
	isOpened: false,
	isLogin: false,
	loginStatus: LOGIN_NORMAL,
};

export default function user(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_LOGIN_INFO: {
			return { ...state, ...action.payload };
		}

		case SET_LOGIN_OUT: {
			return {
				...state,
				avatar: '',
				nickName: '',
				userId: '',
				loginStatus: LOGIN_NORMAL,
				isLogin: false,
				authority: 1,
			};
		}

		case LOGIN: {
			return { ...state, loginStatus: LOGIN, isLogin: true };
		}

		case LOGIN_SUCCESS: {
			return { ...state, loginStatus: LOGIN_SUCCESS, isLogin: false };
		}

		case LOGIN_ERROR: {
			return { ...state, loginStatus: LOGIN_ERROR, isLogin: false };
		}

		default:
			return state;
	}
}
