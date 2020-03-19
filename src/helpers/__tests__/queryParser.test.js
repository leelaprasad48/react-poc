import { queryParser } from '../queryParser';

describe('queryParser', () => {
    test('should return empty object if the string is empty or if string contains only spaces', () => {
        expect(queryParser('')).toEqual({});
        expect(queryParser('   ')).toEqual({});
    });
    test('should return an object with same keys and value', () => {
        expect(queryParser('a=an')).toEqual({ a: 'an' });
        expect(queryParser('a=12&b=3')).toEqual({ a: '12', b: '3' });
    });
    test('should work even if there is ? in the beginning', () => {
        expect(queryParser('?a=an')).toEqual({ a: 'an' });
        expect(queryParser('?a=12&b=3')).toEqual({ a: '12', b: '3' });
    });
});
