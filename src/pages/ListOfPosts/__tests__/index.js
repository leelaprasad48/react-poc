/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { ListOfPosts } from '../index';
import { APP_ROUTES } from '../../../configs/constants';

const defaultProps = {
    error: false,
    fetchAllPosts: jest.fn(),
    loading: false,
    history: { push: jest.fn() },
    postsList: [{
        body: 'sample body 1',
        id: 1,
        title: 'sample title 1',
        userId: 1
    }, {
        body: 'sample body 2',
        id: 2,
        title: 'sample title 2',
        userId: 2
    }]
};

// eslint-disable-next-line react/jsx-filename-extension
const getWrapper = (props) => mount(<ListOfPosts {...props} />);

describe('ListOfPosts', () => {
    it('should render with no error', () => {
        const wrapper = getWrapper(defaultProps);
        expect(wrapper).toHaveLength(1);
    });

    it('should have 3 table rows', () => {
        const wrapper = getWrapper(defaultProps);
        expect(wrapper.find('tr')).toHaveLength(3);
    });
    it('should render correct data', () => {
        const wrapper = getWrapper(defaultProps);
        expect(wrapper.find('td#userid').at(0).text()).toEqual('1');
        expect(wrapper.find('td#title').at(0).text()).toEqual('sample title 1');
        expect(wrapper.find('td#body').at(0).text()).toEqual('sample body 1');
        wrapper.find('tr').at(1).prop('onClick')('1');
        expect(defaultProps.history.push).toBeCalledWith(`${APP_ROUTES.VIEW_POST}?userId=1`);
    });
    it('should show loading when the api is in progress', () => {
        const wrapper = getWrapper({ ...defaultProps, loading: true });
        expect(wrapper.find('div#loading').text()).toEqual('Loading...');
    });

    it('should show error when the error occoured in the API', () => {
        const wrapper = getWrapper({ ...defaultProps, error: true });
        expect(wrapper.find('div#error').text()).toEqual('Something went wrong!');
    });

    it('should call fetchAllPosts', () => {
        const wrapper = getWrapper({ ...defaultProps, postsList: [] });
        expect(wrapper.prop('fetchAllPosts')).toHaveBeenCalled();
    });
});
