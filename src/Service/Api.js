import axios from 'axios';
import { decode } from './Utils';

axios.interceptors.request.use((config) => {
    const tokenSession = localStorage.getItem('t');

    if (tokenSession) {
        const token = decode(tokenSession);
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = token;
    }

    return config;
}, (err) => Promise.reject(err));

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

export async function logout() {
    return axios.post(`${process.env.REACT_APP_API_URL}/logout`);
}

export async function getUsers() {
    return axios.get(`${process.env.REACT_APP_API_URL}/users`);
}

export async function addUser(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/users`);
}
