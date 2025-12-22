import apiClient from './apiClient';

export interface LoginData {
  email: string;
  password: string;
  token?: string; 
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  token?: string; 
}

export const authService = {
  
  async login(data: LoginData) {
    const response = await apiClient.post('/auth/login', data); 
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  async forgotPassword(token: string) {
    const response = await apiClient.post('/auth/forgot-password', { token });
    return response.data;
  },
};