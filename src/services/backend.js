import axios from 'axios';
import config from '../config';

export const backend = axios.create({ baseURL: `${config.backend.host}/api` });