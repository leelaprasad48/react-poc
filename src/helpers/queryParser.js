// eslint-disable-next-line import/prefer-default-export
export function queryParser(queryString) {
    const params = {};

    let _queryString = queryString.trim();
    if (_queryString.length === 0) { return params; }

    _queryString = (_queryString[0] === '?') ? _queryString.substring(1) : _queryString;
    _queryString = _queryString.trim();

    const queries = _queryString.split('&');
    queries.forEach((query) => {
        const [key, value] = query.split('=');
        params[key] = value;
    });
    return params;
}
