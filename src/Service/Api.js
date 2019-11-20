import axios from 'axios';
import { decode } from './Utils';

const url = process.env.REACT_APP_API_URL;

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
    return axios.post(`${url}/login`, { user, password });
            }

export async function logout() {
    return axios.post(`${url}/logout`);
}

export async function getUsers() {
    return axios.get(`${url}/users`);
}

export async function addUser(data) {
    return axios.post(`${url}/users`, { ...data });
}
}
