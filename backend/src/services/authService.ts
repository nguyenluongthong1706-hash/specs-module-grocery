import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'secret';

// 1. Đăng ký tài khoản mới
export const register = async (email: string, password: string, fullName: string) => {
  // Kiểm tra email đã tồn tại chưa
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email này đã được sử dụng!');
  }

  // Mã hóa mật khẩu (Hashing)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Lưu vào Database
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword, // Lưu mật khẩu đã mã hóa
      fullName,
    },
  });

  // Trả về thông tin (trừ mật khẩu ra)
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// 2. Đăng nhập
export const login = async (email: string, password: string) => {
  // Tìm user theo email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Email hoặc mật khẩu không đúng!');
  }

  // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong DB
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Email hoặc mật khẩu không đúng!');
  }

  // Nếu đúng hết, tạo ra Token (Thẻ bài) có hạn dùng 1 ngày
  const token = jwt.sign(
    { userId: user.id, email: user.email }, 
    SECRET_KEY, 
    { expiresIn: '1d' }
  );

  return { token, user: { id: user.id, email: user.email, fullName: user.fullName } };
};