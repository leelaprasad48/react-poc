/* eslint-disable no-shadow */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { queryParser } from '../../helpers/queryParser';
import { fetchAllUsers, fetchAllPosts } from '../../redux/actions';
import userTypePropType from './userTypePropType';
import { StyledDiv, Website } from './styles';
import { APP_ROUTES } from '../../configs/constants';
import { CardsContainer, Card, StyledButton } from '../../common/styles';

const propTypes = {
    fetchAllPosts: PropTypes.func.isRequired,
    fetchAllUsers: PropTypes.func.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            search: PropTypes.string.isRequired
        }).isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    postsReducer: PropTypes.shape({
        postDetails: PropTypes.Object,
        postsError: PropTypes.bool.isRequired,
        postsList: PropTypes.array,
        postsLoading: PropTypes.bool.isRequired
    }).isRequired,

    usersReducer: PropTypes.shape({
        usersError: PropTypes.bool.isRequired,
        usersList: PropTypes.arrayOf(userTypePropType).isRequired,
        usersLoading: PropTypes.bool.isRequired
    }).isRequired
};
export class ViewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postsList: [],
            postDetails: {}
        };
    }

    componentDidMount() {
        const { postsReducer: { postsList }, fetchAllPosts, usersReducer: { usersList }, fetchAllUsers } = this.props;
        if (postsList.length === 0) {
            fetchAllPosts();
        } else {
            const previousQuery = this.props.history.location.search;
            const queryObject = queryParser(previousQuery);
            const { postId } = queryObject;
            const singlePostDetails = postsList.filter((post) => post.id === Number(postId))[0];
            this.setState({
                postDetails: singlePostDetails
            });
        }
        if (usersList.length === 0) {
            fetchAllUsers();
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { postsReducer: { postsList: postsListProps }, history } = props;
        const previousQuery = history.location.search;
        const queryObject = queryParser(previousQuery);
        const { postId } = queryObject;

        const singlePostDetails = postsListProps.filter((post) => post.id === Number(postId))[0];
        if (postsListProps !== state.postsList) {
            return {
                postsList: postsListProps,
                postDetails: singlePostDetails
            };
        }

        return null;
    }

    backToHome() {
        this.props.history.push(APP_ROUTES.LIST_OF_POSTS);
    }

    renderBackToHome() {
        return (
            <StyledButton id="backtohome" onClick={() => this.backToHome()}>Back to Home</StyledButton>
        );
    }

    renderErrorComponent() {
        return (
            <CardsContainer>
                <Card>
                    {this.renderBackToHome()}
                    <div>No post details found</div>
                </Card>
            </CardsContainer>

        );
    }

    render() {
        const { postsReducer: { postsError, postsLoading }, usersReducer: { usersList, usersError, usersLoading } } = this.props;
        const { postDetails } = this.state;
        if (postsLoading || usersLoading) {
            return (<div id="loading">Loading...</div>);
        }
        if (postsError || usersError) {
            return (<div id="error">Something went wrong!</div>);
        }
        if (Object.keys(usersList).length > 0 && postDetails) {
            const userDetails = usersList.filter((user) => user.id === postDetails.userId)[0];
            return (
                <CardsContainer>
                    <Card>
                        {this.renderBackToHome()}
                        <blockquote>
                            <StyledDiv id="title" size="20px">
                                {postDetails.title}
                            </StyledDiv>
                            <footer id="body">
                                {postDetails.body}
                                {' by '}
                                <cite id="name">
                                    {userDetails.name}
                                </cite>
                            </footer>
                        </blockquote>
                        <a href={`https://${userDetails.website}`} id="website">
                            <Website>
                                {userDetails.website}
                            </Website>
                        </a>

                    </Card>
                </CardsContainer>
            );
        }
        return this.renderErrorComponent();
    }
}

const mapStateToProps = (state) => {
    const { usersReducer, postsReducer } = state;
    return {
        usersReducer,
        postsReducer
    };
};

ViewPost.propTypes = propTypes;

export default connect(mapStateToProps, { fetchAllUsers, fetchAllPosts })(withRouter(ViewPost));
