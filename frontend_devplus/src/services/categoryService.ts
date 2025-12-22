import apiClient from './apiClient';

export const getCategories = async () => {
  const response = await apiClient.get('/categories');
  return response.data; // Trả về danh sách loại sản phẩm
};

export const createCategory = async (name: string) => {
  const response = await apiClient.post('/categories', { name });
  return response.data;
};