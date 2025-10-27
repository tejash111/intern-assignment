import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});



export const ProfileAPI = {
    getAllProfiles: () => api.get('/profiles'),
    getSingleProfile: (id) => api.get(`/profiles/${id}`),
    unlockProfile: (id) => api.post(`/profiles/unlock/${id}`),
};

export default api;