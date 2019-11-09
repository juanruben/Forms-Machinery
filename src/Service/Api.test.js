import mockAxios from 'axios';
import { login } from './Api';

describe('Api', () => {
    test('should call login', async () => {
        // setup
        mockAxios.post.mockImplementationOnce(() => Promise.resolve({
            data: {
                token: 'qwertyuiop123456789',
                role: 1,
            },
        }));

        const response = await login('username', 'password');

        expect(response.data.token).toEqual('qwertyuiop123456789');
        expect(response.data.role).toEqual(1);
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(
            `${process.env.REACT_APP_API_URL}${'/login'}`,
            { params: { password: 'password', username: 'username' } },
        );
    });
});
