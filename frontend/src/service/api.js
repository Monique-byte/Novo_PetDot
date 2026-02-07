import axios from 'axios';

// 1. Adicionamos uma barra no final do /api/ para o Axios entender como subdiretório
const API_BASE = import.meta.env.VITE_API_URL || 'https://silent-regions-appear.loca.lt/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

const publicApi = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(err);
    }
);

// --- AUTENTICAÇÃO ---
// Removida a barra inicial '/' de todas as rotas abaixo
export const register = (data) => publicApi.post('auth/register', data);
export const login = (credentials) => publicApi.post('auth/login', credentials);
export const verifyEmail = (token) => publicApi.get(`auth/verify-email/${token}`);
export const forgotPassword = (email) => publicApi.post('auth/request-password-reset', { email });
export const resetPassword = (token, newPassword) => publicApi.post(`auth/reset-password/${token}`, { newPassword });
export const changePassword = (currentPassword, newPassword) => api.post('auth/change-password', { currentPassword, newPassword });

// --- PERFIL ---
export const getProfile = () => api.get('user/profile');
export const updateProfile = (data) => api.put('user/profile', data);

// --- PETS ---
// Ajustadas as rotas para não terem barra no início e usarem as crases corretamente
export const getPets = (tipo) => 
    publicApi.get(`pets${tipo ? `?tipo=${tipo}` : ''}`); 

// No seu api.js, mude apenas esta linha para testar:
export const getPetById = (id) => publicApi.get(`pets/${id}`); // Esta rota vai trazer o objeto com 'historia' e 'hobbies'

export const createPet = (data) => 
    api.post('pets', data);

// --- SOLICITAÇÃO DE ADOÇÃO ---
// Ajustado para 'adoption/solicitar' para seguir o padrão de rotas organizadas
export const solicitarAdocao = (petId, respostas) => 
    api.post('adoption/solicitar', { petId, respostas }); 

export default api;