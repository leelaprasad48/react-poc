import postsReducer from '../postsReducer';
import * as types from '../../actionTypes';

describe('posts reducer', () => {
    const initialState = {
        postsList: [],
        postsLoading: false,
        postsError: false,
        postDetails: []
    };
    it('should return initial state', () => {
        expect(postsReducer(undefined, {})).toEqual(initialState);
    });

    it('should return correct postsLoading state on FETCH_ALL_POSTS_IN_PROGRESS action', () => {
        expect(postsReducer(initialState, {
            type: types.FETCH_ALL_POSTS_IN_PROGRESS
        })).toEqual({
            ...initialState,
            postsLoading: true
        });
    });

    it('should return all posts on FETCH_ALL_POSTS action', () => {
        const postsArray = [{ id: 1,
            userId: 1,
            title: 'sample post',
            body: 'sample body' }];
        expect(postsReducer({ ...initialState, postsList: postsArray }, {
            type: types.FETCH_ALL_POSTS
        })).toEqual(postsArray);
    });

    it('should return new posts on FETCH_ALL_POSTS_SUCCESS action', () => {
        const newPostArray = [{ id: 2,
            userId: 2,
            title: 'sample post',
            body: 'sample body' }];
        expect(postsReducer(initialState, {
            type: types.FETCH_ALL_POSTS_SUCCESS,
            payload: newPostArray
        })).toEqual({
            ...initialState,
            postsLoading: false,
            postsList: newPostArray
        });
    });

    it('should return postsError on FETCH_ALL_POSTS_ERROR action', () => {
        expect(postsReducer(initialState, {
            type: types.FETCH_ALL_POSTS_ERROR
        })).toEqual({
            ...initialState,
            postsError: true
        });
    });
});
