import apiClient from './apiClient';

// Định nghĩa cấu trúc dữ liệu gửi lên Backend Prisma
export interface ProductInput {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
  image?: string;
}

export const getAllProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};

// Tham số productData bây giờ là kiểu ProductInput (Object), không phải FormData
export const addProduct = async (productData: ProductInput) => {
  const response = await apiClient.post('/products', productData);
  return response.data;
};

// Ép kiểu id thành number để khớp với Prisma
export const updateProduct = async (id: number, productData: ProductInput) => {
  const response = await apiClient.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};