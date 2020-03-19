/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { queryParser } from '../../helpers/queryParser';
import { fetchAllUsers, fetchUserById } from '../../redux/actions';
import userTypePropType from './userTypePropType';
import { CardsContainer, Card, StyledDiv, CardRow, Website } from './styles';

export function ViewPost(props) {
    const { usersList, history, loading, error, fetchAllUsers, fetchUserById, userData } = props;
    const { name, email, phone, website, address, company } = userData;
    const previousQuery = history.location.search;
    const queryObject = queryParser(previousQuery);
    const { userId } = queryObject;

    useEffect(() => {
        if (usersList.length === 0) {
            fetchAllUsers(userId);
        } else {
            fetchUserById(userId);
        }
    }, [usersList, fetchAllUsers, fetchUserById, userId]);

    return (
        <CardsContainer>
            {loading && (
                <div id="loading">Loading...</div>
            )}
            {error && <div id="error">Something went wrong!</div>}
            { !error && !loading && !!userData && !!usersList && (
                <Card>
                    <StyledDiv id="name" size="20px">
                        {name}
                    </StyledDiv>
                    <StyledDiv id="email">
                        {email}
                    </StyledDiv>
                    <StyledDiv id="phone">
                        {phone}
                    </StyledDiv>
                    <CardRow>
                        <StyledDiv id="address">Address</StyledDiv>
                        <StyledDiv>
                            <StyledDiv id="suite">
                                {address && address.suite}
                            </StyledDiv>
                            <StyledDiv id="street">
                                {address && address.street}
                            </StyledDiv>
                            <StyledDiv id="city">
                                {address && address.city}
                            </StyledDiv>
                            <StyledDiv id="zipcode">
                                {address && address.zipcode}
                            </StyledDiv>
                        </StyledDiv>
                    </CardRow>
                    <CardRow>
                        <StyledDiv>Company</StyledDiv>
                        <StyledDiv>
                            <StyledDiv id="companyname">
                                {company && company.name}
                            </StyledDiv>
                            <StyledDiv id="catchphrase" size="12px">
                                {company && company.catchPhrase}
                            </StyledDiv>

                        </StyledDiv>
                    </CardRow>
                    <a href={`https://${userData.website}`} id="website">
                        <Website>
                            {website}
                        </Website>
                    </a>
                </Card>
            )}
        </CardsContainer>
    );
}

const mapStateToProps = (state) => {
    const { usersReducer } = state;
    return usersReducer;
};

ViewPost.propTypes = {
    error: PropTypes.bool.isRequired,
    fetchAllUsers: PropTypes.func.isRequired,
    fetchUserById: PropTypes.func.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            search: PropTypes.string.isRequired
        }).isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    userData: userTypePropType,
    usersList: PropTypes.arrayOf(userTypePropType).isRequired
};
ViewPost.defaultProps = {
    userData: {
        address: {
            city: undefined,
            street: undefined,
            suite: undefined,
            zipcode: undefined
        },
        company: {
            bs: undefined,
            catchPhrase: undefined,
            name: undefined
        },
        id: undefined,
        name: undefined,
        phone: undefined,
        username: undefined,
        website: undefined
    }
};
export default connect(mapStateToProps, { fetchAllUsers, fetchUserById })(withRouter(ViewPost));
