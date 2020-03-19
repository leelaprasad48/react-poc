/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { ViewPost } from '../index';

const userData = {
    address: {
        city: 'sample city',
        street: 'sample street',
        suite: 'sample suite',
        zipcode: 'sample zipcode'
    },
    company: {
        bs: 'sample bs',
        catchPhrase: 'sample catchphrase',
        name: 'sample name'
    },
    id: 1,
    name: 'sample name',
    phone: 'sample phone',
    username: 'sample username',
    email: 'sample email',
    website: 'sample website'
};
const defaultProps = {
    fetchUserById: jest.fn(),
    fetchAllUsers: jest.fn(),
    usersList: [userData],
    loading: false,
    error: false,
    userData,
    history: { push: jest.fn(), location: { search: '?userId=1' } },
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
        expect(wrapper.find('div#name').text()).toEqual(userData.name);
        expect(wrapper.find('div#email').text()).toEqual(userData.email);
        expect(wrapper.find('div#phone').text()).toEqual(userData.phone);
        expect(wrapper.find('div#suite').text()).toEqual(userData.address.suite);
        expect(wrapper.find('div#street').text()).toEqual(userData.address.street);
        expect(wrapper.find('div#city').text()).toEqual(userData.address.city);
        expect(wrapper.find('div#zipcode').text()).toEqual(userData.address.zipcode);
        expect(wrapper.find('div#companyname').text()).toEqual(userData.company.name);
        expect(wrapper.find('div#catchphrase').text()).toEqual(userData.company.catchPhrase);
        expect(wrapper.find('a').prop('href')).toEqual(`https://${userData.website}`);
        expect(wrapper.prop('fetchUserById')).toHaveBeenCalledWith('1');
    });

    it('should show loading when the api is in progress', () => {
        const wrapper = getWrapper({ ...defaultProps, loading: true });
        expect(wrapper.find('div#loading').text()).toEqual('Loading...');
    });

    it('should show error when the error occoured in the API', () => {
        const wrapper = getWrapper({ ...defaultProps, error: true });
        expect(wrapper.find('div#error').text()).toEqual('Something went wrong!');
    });

    it('should call fetchAllUsers', () => {
        const wrapper = getWrapper({ ...defaultProps, usersList: [] });
        expect(wrapper.prop('fetchAllUsers')).toHaveBeenCalledWith('1');
    });
});
