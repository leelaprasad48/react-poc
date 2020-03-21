/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAllPosts } from '../../redux/actions';
import { TableContainer, StyledTable, StyledTh, StyledTd, StyledContainer, StyledSection, StyledTr } from './styles';

import { APP_ROUTES } from '../../configs/constants';

export function ListOfPosts(props) {
    const { postsList, history, postsLoading: loading, postsError: error, fetchAllPosts } = props;
    useEffect(() => {
        if (postsList.length === 0) {
            fetchAllPosts();
        }
    }, [postsList, fetchAllPosts]);
    function onPostClick(post) {
        history.push(`${APP_ROUTES.VIEW_POST}?postId=${post}`);
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
                                    <StyledTh>Id</StyledTh>
                                    <StyledTh>User Id</StyledTh>
                                    <StyledTh>Title</StyledTh>
                                </StyledTr>
                            </thead>
                            <tbody>
                                {postsList.map((post) => (
                                    <StyledTr key={post.id} onClick={() => onPostClick(post.id)}>
                                        <StyledTd id="id">{post.id}</StyledTd>
                                        <StyledTd id="userid">{post.userId}</StyledTd>
                                        <StyledTd id="title">{post.title}</StyledTd>
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
    fetchAllPosts: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    postsError: PropTypes.bool.isRequired,
    postsList: PropTypes.arrayOf(
        PropTypes.shape({
            body: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            userId: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    postsLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { fetchAllPosts })(withRouter(ListOfPosts));
