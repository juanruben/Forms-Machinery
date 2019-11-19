import axios from 'axios';

export async function login(user, password) {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        user,
        password,
    }).then((res) => res)
        .catch((error) => {
            if (error.response) {
                return error.response;
            }
            return null;
        });
    return response;
}
