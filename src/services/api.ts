import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // A URL da sua FastAPI
});

export default api;