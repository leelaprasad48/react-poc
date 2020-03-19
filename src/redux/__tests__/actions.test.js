import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchUserById, fetchAllPosts, fetchAllUsers } from '../actions';
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

    it('should create an action to get userById when fetchUserById is called', async () => {
        const expectedAction = [{
            type: types.FETCH_USER_BY_ID,
            payload: 1
        }];
        await store.dispatch(fetchUserById(1));
        expect(store.getActions()).toEqual(expectedAction);
    });

    it('should create an action FETCH_ALL_POSTS_IN_PROGRESS', async () => {
        // const response = { data: [{ userId: 1, id: 1, title: 'sampleTitle, body: sampleBody' }] };
        // mockAxios.onGet(API_ROUTES.LIST_OF_POSTS).replyOnce(200, response);
        const expectedActions = [{ type: types.FETCH_ALL_POSTS_IN_PROGRESS },
        //      {
        //     type: types.FETCH_ALL_POSTS_SUCCESS,
        //     payload: response.data
        // }
        ];
        await store.dispatch(fetchAllPosts());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action FETCH_ALL_USERS_IN_PROGRESS when fetchAllUsers is called', async () => {
        const expectedActions = [{ type: types.FETCH_ALL_USERS_IN_PROGRESS }];
        await store.dispatch(fetchAllUsers(1));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
