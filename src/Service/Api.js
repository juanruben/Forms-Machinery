/* eslint-disable camelcase */
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

export async function recover(email) {
    return axios.post(`${url}/password`, { email });
}

export async function restore(data) {
    return axios.post(`${url}/reset`, { ...data });
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

export async function restoreUser(id) {
    return axios.get(`${url}/users/recovery/${id}`);
}

// CLIENTS

export async function getClients() {
    return axios.get(`${url}/clients`);
}

export async function getConstructionsByClient(id) {
    return axios.get(`${url}/clients/${id}/constructions`);
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

export async function getMachine(id) {
    return axios.get(`${url}/machine/${id}`);
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

export async function getForm(id) {
    return axios.get(`${url}/forms/${id}`);
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

export async function copyForm(form_id) {
    return axios.post(`${url}/forms/copy/form`, { form_id });
}

export async function addSection(data, form_id) {
    return axios.post(`${url}/forms/${form_id}/sections`, { ...data });
}

export async function updateSection(data, id) {
    return axios.patch(`${url}/forms/sections/${id}`, { ...data });
}

export async function orderSection(data, id) {
    return axios.patch(`${url}/forms/order/section/${id}`, { ...data });
}

export async function deleteSection(id) {
    return axios.delete(`${url}/forms/sections/${id}`);
}

export async function copySection(section_id) {
    return axios.post(`${url}/forms/copy/section`, { section_id });
}

// FIELDS

export async function getFields(section_id) {
    return axios.get(`${url}/sections/${section_id}`);
}

export async function addField(data, section_id) {
    return axios.post(`${url}/forms/sections/${section_id}/fields`, { ...data });
}

export async function updateField(data, id) {
    return axios.patch(`${url}/forms/sections/fields/${id}`, { ...data });
}

export async function orderField(data, section_id) {
    return axios.patch(`${url}/forms/order/field/${section_id}`, { ...data });
}

export async function deleteField(id) {
    return axios.delete(`${url}/forms/sections/fields/${id}`);
}

export async function copyField(field_id) {
    return axios.post(`${url}/forms/copy/field`, { field_id });
}

// REGISTER

export async function sendRegister(data) {
    return axios.post(`${url}/register`, { ...data });
}

export async function getRegisters() {
    return axios.get(`${url}/register`);
}

export async function getRegistersDiff(id) {
    return axios.get(`${url}/register/diff/${id}`);
}
