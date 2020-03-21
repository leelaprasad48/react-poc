import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchAllPosts, fetchAllUsers } from '../actions';
import * as types from '../actionTypes';

const mockStore = configureMockStore([thunk]);

describe('posts and users actions', () => {
    let mockAxios;
    let store;
    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        store = mockStore({
            usersReducer: {
                usersList: [],
                userData: []
            },
            postsReducer: {
                postsList: []
            }
        });
    });
    afterEach(() => {
        mockAxios.restore();
    });

    it('should create an action FETCH_ALL_POSTS_IN_PROGRESS', async () => {
        const expectedActions = [{ type: types.FETCH_ALL_POSTS_IN_PROGRESS }];
        await store.dispatch(fetchAllPosts());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action FETCH_ALL_USERS_IN_PROGRESS when fetchAllUsers is called', async () => {
        const expectedActions = [{ type: types.FETCH_ALL_USERS_IN_PROGRESS }];
        await store.dispatch(fetchAllUsers(1));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
