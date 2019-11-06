import { validateEmail, validateUsername, validatePassword } from './Utils';

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
        expect(validateUsername('3123123')).toBeFalsy();
        expect(validateUsername('test123')).toBeFalsy();
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
});
