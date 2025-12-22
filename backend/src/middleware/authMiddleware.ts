import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

// Định nghĩa lại kiểu Request để có thể gắn thông tin user vào sau khi giải mã
export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  // 1. Lấy token từ header gửi lên
  // Client sẽ gửi dạng: "Authorization: Bearer <token_cua_ban>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Lấy phần token sau chữ Bearer

  if (!token) {
    res.status(401).json({ error: 'Truy cập bị từ chối! Bạn cần đăng nhập (Thiếu Token).' });
    return;
  }

  // 2. Kiểm tra token có hợp lệ không
  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ error: 'Token không hợp lệ hoặc đã hết hạn!' });
      return;
    }
    
    // 3. Nếu ngon lành, lưu thông tin user vào biến req để dùng ở bước sau
    req.user = user;
    next(); // Cho phép đi tiếp vào Controller
  });
};