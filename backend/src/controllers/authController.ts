import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;

    const user = await authService.register(email, password, fullName);
    res.status(201).json({ message: 'Đăng ký thành công!', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json({ message: 'Đăng nhập thành công!', ...data });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};