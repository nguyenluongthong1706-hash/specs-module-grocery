import apiClient from './apiClient';

export interface LoginData {
  email: string;
  password: string;
  token?: string; // Thêm token vào payload
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  token?: string; // Thêm token vào payload
}

export const authService = {
  // Gửi email, password và token khi đăng nhập
  async login(data: LoginData) {
    const response = await apiClient.post('/auth/login', data); 
    return response.data;
  },

  // Gửi thông tin đăng ký kèm token
  async register(data: RegisterData) {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  // Khôi phục mật khẩu chỉ bằng token
  async forgotPassword(token: string) {
    const response = await apiClient.post('/auth/forgot-password', { token });
    return response.data;
  },
};