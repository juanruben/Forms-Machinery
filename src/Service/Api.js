import axios from 'axios';

export async function login(username, password) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
            params: {
                username,
                password,
            },
        });
        return response;
    } catch (e) {
        return null;
    }
}
