import { GET_USERS, USERS_NORMAL, UPDATE_USERS, USERS_SUCCESS, SET_USERS } from '../constants/';

const INITIAL_STATE = {
	users: [],
	isUsers: false,
	usersStatus: USERS_NORMAL,
};

export default function users(state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_USERS: {
			return { ...state, postStatus: GET_USERS, isUsers: true };
		}

		case UPDATE_USERS: {
			return { ...state, users: state.users };
		}

		case USERS_SUCCESS: {
			return { ...state, postStatus: USERS_SUCCESS, isUsers: false };
		}

		case SET_USERS: {
			const { users: asUsers } = action.payload;
			return { ...state, users: state.users.concat(...asUsers) };
		}

		default:
			return state;
	}
}
