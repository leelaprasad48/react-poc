/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { ViewPost } from '../index';
import { APP_ROUTES } from '../../../configs/constants';

const postsList = [{
    body: 'sample body 1',
    id: 1,
    title: 'sample title 1',
    userId: 1
}, {
    body: 'sample body 2',
    id: 2,
    title: 'sample title 2',
    userId: 2
}];
const usersList = [{
    id: 1,
    name: 'leela',
    website: 'samplesite'
}, {
    id: 2,
    name: 'prasad',
    website: 'samplesite2'
}];
const defaultProps = {
    fetchAllUsers: jest.fn(),
    fetchAllPosts: jest.fn(),
    postsReducer: {
        postDetails: postsList[0],
        postsError: false,
        postsList,
        postsLoading: false
    },
    usersReducer: {
        usersList,
        usersError: false,
        usersLoading: false
    },
    history: { push: jest.fn(), location: { search: '?postId=1' } },
};

// eslint-disable-next-line react/jsx-filename-extension
const getWrapper = (props) => mount(<ViewPost {...props} />);

describe('ViewPost', () => {
    it('should render without error', () => {
        const wrapper = getWrapper(defaultProps);
        expect(wrapper).toHaveLength(1);
    });
    it('should return the correct details', () => {
        const wrapper = getWrapper(defaultProps);
        const userData = usersList[0];
        const postData = postsList[0];
        expect(wrapper.find('cite#name').text()).toEqual(userData.name);
        expect(wrapper.find('div#title').text()).toEqual(postData.title);
        expect(wrapper.find('footer#body').text()).toEqual(`${postData.body} by ${userData.name}`);
        expect(wrapper.find('a').prop('href')).toEqual(`https://${userData.website}`);
    });

    it('should call fetchAllPosts', () => {
        const wrapper = getWrapper({ ...defaultProps, postsReducer: { postsList: [], postDetails: {}, postsError: false, postsLoading: false } });
        expect(wrapper.prop('fetchAllPosts')).toHaveBeenCalled();
    });

    it('should call fetchAllUsers', () => {
        const wrapper = getWrapper({ ...defaultProps, usersReducer: { usersList: [], usersError: false, usersLoading: false } });
        expect(wrapper.prop('fetchAllUsers')).toHaveBeenCalled();
    });

    it('should redirect to back to home on back button click', () => {
        const wrapper = getWrapper(defaultProps);
        wrapper.find('button#backtohome').prop('onClick')();
        expect(defaultProps.history.push).toBeCalledWith(APP_ROUTES.LIST_OF_POSTS);
    });
});
