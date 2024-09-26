import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cadastro-usuario-red.vercel.app', // Substitua pela URL do back-end
});

export default api;
