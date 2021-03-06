import userReducer from '../usersReducer';
import * as types from '../../actionTypes';

describe('user reducer', () => {
    const initialState = {
        usersList: [],
        usersLoading: false,
        usersError: false,
        userData: {}
    };
    it('should return initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it('should return correct usersLoading state on FETCH_ALL_USERS_IN_PROGRESS action', () => {
        expect(userReducer(initialState, {
            type: types.FETCH_ALL_USERS_IN_PROGRESS
        })).toEqual({
            ...initialState,
            usersLoading: true
        });
    });

    it('should return correct usersError state on FETCH_ALL_USERS_ERROR action', () => {
        expect(userReducer(initialState, {
            type: types.FETCH_ALL_USERS_ERROR
        })).toEqual({
            ...initialState,
            usersError: true
        });
    });

    it('should return all users on FETCH_ALL_USERS_SUCCESS action', () => {
        const usersArray = [{ id: 1,
            name: 'sample name',
            username: 'sample username',
            email: 'sampleemail@gmail.com' }];
        expect(userReducer(initialState, {
            type: types.FETCH_ALL_USERS_SUCCESS,
            payload: usersArray
        })).toEqual({
            ...initialState,
            usersList: usersArray
        });
    });

    it('should return correct post on FETCH_USER_BY_ID action', () => {
        const newPostArray = [{ id: 2,
            userId: 2,
            title: 'sample post',
            body: 'sample body' }, { id: 3,
            userId: 3,
            title: 'sample post 3',
            body: 'sample body 3' }];
        expect(userReducer({ ...initialState, usersList: newPostArray }, {
            type: types.FETCH_USER_BY_ID,
            payload: '3'
        })).toEqual({
            ...initialState,
            usersList: newPostArray,
            usersLoading: false,
            userData: { id: 3,
                userId: 3,
                title: 'sample post 3',
                body: 'sample body 3' }
        });
    });

    it('should return usersError on FETCH_ALL_USERS Error action', () => {
        expect(userReducer(initialState, {
            type: types.FETCH_ALL_USERS
        })).toEqual({
            ...initialState,
            usersError: false
        });
    });
});
