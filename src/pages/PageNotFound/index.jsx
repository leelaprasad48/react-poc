import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CardsContainer, Card, StyledButton } from '../../common/styles';
import { APP_ROUTES } from '../../configs/constants';

export function PageNotFound({ history }) {
    function backToHome() {
        history.push(APP_ROUTES.LIST_OF_POSTS);
    }
    return (
        <CardsContainer>
            <Card>
                <StyledButton id="backtohome" onClick={() => backToHome()}>Back to Home</StyledButton>
                <div id="pagenotfound">
                    This Page is broke!
                </div>

            </Card>
        </CardsContainer>
    );
}
PageNotFound.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
};
export default withRouter(PageNotFound);
