import PropTypes from 'prop-types';

const userTypePropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired
});

export default userTypePropType;
