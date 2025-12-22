import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi lấy danh mục' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newCategory = await categoryService.createCategory(name, description);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: 'Không thể tạo danh mục (có thể tên bị trùng)' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updated = await categoryService.updateCategory(Number(id), name, description);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Lỗi cập nhật danh mục' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(Number(id));
    res.json({ message: 'Xóa danh mục thành công' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Lỗi xóa danh mục' });
  }
};