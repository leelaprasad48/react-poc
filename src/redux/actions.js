import axios from 'axios';
import { FETCH_ALL_POSTS_IN_PROGRESS,
    FETCH_ALL_POSTS_SUCCESS, FETCH_ALL_POSTS_ERROR,
    FETCH_ALL_USERS_IN_PROGRESS, FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_ERROR,
    FETCH_USER_BY_ID } from './actionTypes';
import { API_ROUTES } from '../configs/constants';

export function fetchAllPosts() {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_POSTS_IN_PROGRESS });
        axios(API_ROUTES.LIST_OF_POSTS)
            .then((response) => {
                dispatch({ type: FETCH_ALL_POSTS_SUCCESS, payload: response.data });
            })
            .catch(() => {
                dispatch({ type: FETCH_ALL_POSTS_ERROR });
            });
    };
}

export function fetchAllUsers(userId) {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_USERS_IN_PROGRESS });
        axios(API_ROUTES.LIST_OF_USERS)
            .then((response) => {
                dispatch({ type: FETCH_ALL_USERS_SUCCESS, payload: response.data });
                dispatch({ type: FETCH_USER_BY_ID, payload: userId });
            })
            .catch(() => {
                dispatch({ type: FETCH_ALL_USERS_ERROR });
            });
    };
}

export function fetchUserById(userId) {
    return (dispatch) => {
        dispatch({ type: FETCH_USER_BY_ID, payload: userId });
    };
}
