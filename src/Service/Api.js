import axios from 'axios';

export async function login(user, password) {
    try {
        return await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
            user,
            password,
        }).then((res) => res);
    } catch (e) {
        return null;
    }
}
