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

// GENERAL

export async function login(data) {
    return axios.post(`${url}/login`, { ...data });
}

export async function logout() {
    return axios.post(`${url}/logout`);
}

// USERS

export async function getUsers() {
    return axios.get(`${url}/users`);
}

export async function addUser(data) {
    return axios.post(`${url}/users`, { ...data });
}

export async function updateUser(data, id) {
    return axios.put(`${url}/users/${id}`, { ...data });
}

export async function deleteUser(id) {
    return axios.delete(`${url}/users/${id}`);
}

// CLIENTS

export async function getClients() {
    return axios.get(`${url}/clients`);
}

export async function addClient(data) {
    return axios.post(`${url}/clients`, { ...data });
}

export async function updateClient(data, id) {
    return axios.put(`${url}/clients/${id}`, { ...data });
}

export async function deleteClient(id) {
    return axios.delete(`${url}/clients/${id}`);
}

// MACHINE

export async function getMachines() {
    return axios.get(`${url}/machine`);
}

export async function addMachine(data) {
    return axios.post(`${url}/machine`, { ...data });
}

export async function updateMachine(data, id) {
    return axios.put(`${url}/machine/${id}`, { ...data });
}

export async function deleteMachine(id) {
    return axios.delete(`${url}/machine/${id}`);
}

// CONSTRUCTIONS

export async function getConstructions() {
    return axios.get(`${url}/construction`);
}

export async function addConstruction(data) {
    return axios.post(`${url}/construction`, { ...data });
}

export async function updateConstruction(data, id) {
    return axios.put(`${url}/construction/${id}`, { ...data });
}

export async function deleteConstruction(id) {
    return axios.delete(`${url}/construction/${id}`);
}

// FORMS

export async function getForms() {
    return axios.get(`${url}/forms`);
}

export async function addForm(data) {
    return axios.post(`${url}/forms`, { ...data });
}

export async function updateForm(data, id) {
    return axios.put(`${url}/forms/${id}`, { ...data });
}

export async function deleteForm(id) {
    return axios.delete(`${url}/forms/${id}`);
}

