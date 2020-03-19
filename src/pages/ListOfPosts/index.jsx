/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAllPosts } from '../../redux/actions';
import { TableContainer, StyledTable, StyledTh, StyledTd, StyledContainer, StyledSection, StyledTr } from './styles';

import { APP_ROUTES } from '../../configs/constants';

export function ListOfPosts(props) {
    const { postsList, history, loading, error, fetchAllPosts } = props;
    useEffect(() => {
        if (postsList.length === 0) {
            fetchAllPosts();
        }
    }, [postsList, fetchAllPosts]);
    function onPostClick(userId) {
        history.push(`${APP_ROUTES.VIEW_POST}?userId=${userId}`);
    }

    return (
        <StyledContainer>
            {error && <div id="error">Something went wrong!</div>}
            {loading && (
                <div id="loading">Loading...</div>
            )}
            {!!postsList && !loading && (
                <StyledSection>
                    <TableContainer>
                        <StyledTable>
                            <thead>
                                <StyledTr>
                                    <StyledTh>User Id</StyledTh>
                                    <StyledTh>Title</StyledTh>
                                    <StyledTh>Body</StyledTh>
                                </StyledTr>
                            </thead>
                            <tbody>
                                {postsList.map((post) => (
                                    <StyledTr key={post.id} onClick={() => onPostClick(post.userId)}>
                                        <StyledTd id="userid">{post.userId}</StyledTd>
                                        <StyledTd id="title">{post.title}</StyledTd>
                                        <StyledTd id="body">{post.body}</StyledTd>
                                    </StyledTr>
                                ))}
                            </tbody>
                        </StyledTable>

                    </TableContainer>
                </StyledSection>
            )}
        </StyledContainer>
    );
}
const mapStateToProps = (state) => {
    const { postsReducer } = state;
    return postsReducer;
};

ListOfPosts.propTypes = {
    error: PropTypes.bool.isRequired,
    fetchAllPosts: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    postsList: PropTypes.arrayOf(
        PropTypes.shape({
            body: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            userId: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired
};

export default connect(mapStateToProps, { fetchAllPosts })(withRouter(ListOfPosts));
