import {
    validateEmail, validateUsername, validatePassword, encode, decode,
    validateRut, formatRut, unformatRut, dateToLocale,
} from './Utils';

describe('Utils', () => {
    test('validate email', () => {
        expect(validateEmail('test@test.com')).toBeTruthy();
        expect(validateEmail('')).toBeFalsy();
        expect(validateEmail('test')).toBeFalsy();
        expect(validateEmail('test@')).toBeFalsy();
        expect(validateEmail('test@test.com@')).toBeFalsy();
        expect(validateEmail('test@@test.com')).toBeFalsy();
    });

    test('validate username', () => {
        expect(validateUsername('test')).toBeTruthy();
        expect(validateUsername('')).toBeFalsy();
        expect(validateUsername('3123123')).toBeTruthy();
        expect(validateUsername('test123')).toBeTruthy();
        expect(validateUsername('Test123')).toBeFalsy();
    });

    test('validate password', () => {
        expect(validatePassword('Abcde1')).toBeTruthy();
        expect(validatePassword('')).toBeFalsy();
        expect(validatePassword('test')).toBeFalsy();
        expect(validatePassword('abcde1')).toBeFalsy();
        expect(validatePassword('abcdef')).toBeFalsy();
        expect(validatePassword('3123123')).toBeFalsy();
        expect(validatePassword('test123')).toBeFalsy();
    });

    test('encoding', () => {
        expect(encode('test')).toEqual('WkVkV2VtUkJQVDA9');
    });

    test('decoding', () => {
        expect(decode('WkVkV2VtUkJQVDA9')).toEqual('test');
    });

    test('validate rut', () => {
        expect(validateRut('Abcde1')).toBeFalsy();
        expect(validateRut('25622766-5')).toBeTruthy();
        expect(validateRut('')).toBeFalsy();
    });

    test('format rut', () => {
        expect(formatRut('256227665')).toEqual('25.622.766-5');
        expect(formatRut('')).toEqual('');
    });

    test('unformat rut', () => {
        expect(unformatRut('25.622.766-5')).toEqual('25622766-5');
        expect(unformatRut('')).toEqual('');
    });

    test('date to locale', () => {
        expect(dateToLocale('2019-11-29 15:48:56')).toEqual('2019-11-29 12:48:56');
        expect(dateToLocale('2019-12-1 00:30:00')).toEqual('2019-11-30 21:30:00');
    });
});
