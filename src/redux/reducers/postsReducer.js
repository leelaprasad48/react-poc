import { FETCH_ALL_POSTS, FETCH_ALL_POSTS_SUCCESS, FETCH_ALL_POSTS_IN_PROGRESS, FETCH_ALL_POSTS_ERROR } from '../actionTypes';

const initialState = {
    postsList: [],
    loading: false,
    error: false
};

export default function (state = initialState, action) {
    switch (action.type) {
    case FETCH_ALL_POSTS: {
        return state.postsList;
    }
    case FETCH_ALL_POSTS_IN_PROGRESS: {
        return {
            ...state,
            loading: true
        };
    }
    case FETCH_ALL_POSTS_SUCCESS: {
        return {
            ...state,
            loading: false,
            postsList: state.postsList.concat(action.payload)
        };
    }
    case FETCH_ALL_POSTS_ERROR: {
        return {
            ...state,
            loading: false,
            error: true
        };
    }
    default:
        return state;
    }
}
