import PropTypes from 'prop-types';

const userTypePropType = PropTypes.shape({
    address: PropTypes.shape({
        city: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        suite: PropTypes.string.isRequired,
        zipcode: PropTypes.string.isRequired,

    }).isRequired,
    company: PropTypes.shape({
        bs: PropTypes.string.isRequired,
        catchPhrase: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired
});

export default userTypePropType;
