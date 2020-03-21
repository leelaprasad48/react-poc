/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { PageNotFound } from '../index';
import { APP_ROUTES } from '../../../configs/constants';

const defaultProps = {
    history: { push: jest.fn(), location: { search: '?postId=1' } }
};

// eslint-disable-next-line react/jsx-filename-extension
const getWrapper = (props) => mount(<PageNotFound {...props} />);

describe('PageNotFound', () => {
    it('should render with no error', () => {
        const wrapper = getWrapper(defaultProps);
        expect(wrapper).toHaveLength(1);
    });

    it('should contain correct error message', () => {
        const wrapper = getWrapper(defaultProps);
        expect(wrapper.find('div#pagenotfound').text()).toEqual('This Page is broke!');
    });

    it('should redirect back to home page when back button is clicked', () => {
        const wrapper = getWrapper(defaultProps);
        wrapper.find('button#backtohome').prop('onClick')();
        expect(defaultProps.history.push).toBeCalledWith(APP_ROUTES.LIST_OF_POSTS);
    });
});
