import { backend } from '../backend';

export const getUsers = () => backend.get('/users');

export const createUser = (data) => backend.post('/users', data);
