import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export { http };
