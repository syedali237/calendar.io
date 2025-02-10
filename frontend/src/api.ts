import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000/",
    // baseURL: "https://test-repo-umuy.onrender.com/",
});

api.interceptors.request.use((config) => {
    const data = localStorage.getItem("user-info");
    const userData = data ? JSON.parse(data) : null;
    const token = userData?.googleAccessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const googleAuth = (code: string) => api.get(`auth/google?code=${code}`);

export const getEvents = () => api.get("calendar/events");

export default api;