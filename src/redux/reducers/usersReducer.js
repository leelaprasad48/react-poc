import { FETCH_ALL_USERS_SUCCESS, FETCH_ALL_USERS_IN_PROGRESS, FETCH_ALL_USERS_ERROR, FETCH_USER_BY_ID } from '../actionTypes';

const initialState = {
    usersList: [],
    loading: false,
    error: false,
    userData: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
    case FETCH_ALL_USERS_IN_PROGRESS: {
        return {
            ...state,
            loading: true
        };
    }
    case FETCH_ALL_USERS_SUCCESS: {
        return {
            ...state,
            loading: false,
            usersList: state.usersList.concat(action.payload)
        };
    }
    case FETCH_ALL_USERS_ERROR: {
        return {
            ...state,
            loading: false,
            error: true
        };
    }
    case FETCH_USER_BY_ID: {
        const userDetails = state.usersList.filter((user) => user.id === Number(action.payload));
        const hasData = userDetails.length > 0;
        return {
            ...state,
            userData: userDetails[0],
            error: !hasData
        };
    }
    default:
        return state;
    }
}
