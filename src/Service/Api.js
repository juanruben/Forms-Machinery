import axios from 'axios';

export async function login(username, password) {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos/1`, {
        params: {
            username,
            password,
        },
    });
    return response;
}
