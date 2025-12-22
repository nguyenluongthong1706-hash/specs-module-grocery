import axios from 'axios';

// 1. Tạo instance của axios
const apiClient = axios.create({
  // Sử dụng biến môi trường từ file .env bạn đã tạo
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Cấu hình Response Interceptor (Xử lý lỗi tập trung)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu lỗi 401 (Unauthorized) - Token hết hạn hoặc không hợp lệ
    if (error.response?.status === 401) {
      localStorage.removeItem('token'); // Xóa token cũ
      window.location.href = '/login';   // Đẩy người dùng về trang đăng nhập
    }
    return Promise.reject(error);
  }
);

export default apiClient;