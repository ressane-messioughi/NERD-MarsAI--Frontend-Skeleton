import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // prend la valeur du .env.local
  withCredentials: true, // si tu utilises cookies pour auth
});

export default api;
