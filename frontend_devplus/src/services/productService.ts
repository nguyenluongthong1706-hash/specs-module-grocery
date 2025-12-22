import apiClient from './apiClient';

export const getAllProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const addProduct = async (formData: FormData) => {
  // Dùng FormData để gửi cả file ảnh và thông tin text
  const response = await apiClient.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};