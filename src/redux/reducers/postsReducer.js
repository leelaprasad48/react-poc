import { FETCH_ALL_POSTS, FETCH_ALL_POSTS_SUCCESS, FETCH_ALL_POSTS_IN_PROGRESS, FETCH_ALL_POSTS_ERROR } from '../actionTypes';

const initialState = {
    postsList: [],
    postsLoading: false,
    postsError: false,
    postDetails: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case FETCH_ALL_POSTS: {
        return state.postsList;
    }
    case FETCH_ALL_POSTS_IN_PROGRESS: {
        return {
            ...state,
            postsLoading: true
        };
    }
    case FETCH_ALL_POSTS_SUCCESS: {
        return {
            ...state,
            postsList: state.postsList.concat(action.payload),
            postsLoading: false,
            postsError: false
        };
    }
    case FETCH_ALL_POSTS_ERROR: {
        return {
            ...state,
            postsLoading: false,
            postsError: true
        };
    }

    default:
        return state;
    }
}
