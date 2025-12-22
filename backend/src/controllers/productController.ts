import { Request, Response } from 'express';
import * as productService from '../services/productService';

export const getProducts = async (req: Request, res: Response) => {
  try {
    // Lấy từ khóa tìm kiếm từ URL: /api/products?search=iphone
    const search = req.query.search as string;
    const products = await productService.getAllProducts(search);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi lấy danh sách sản phẩm' });
  }
};

export const getProductDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(Number(id));
    if (!product) {
       res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
       return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi lấy chi tiết sản phẩm' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, categoryId, description, image } = req.body;

    const newProduct = await productService.createProduct({
      name,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(categoryId),
      description,
      image
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Lỗi tạo sản phẩm (Kiểm tra lại categoryId có tồn tại không)' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await productService.updateProduct(Number(id), req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Lỗi cập nhật sản phẩm' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(Number(id));
    res.json({ message: 'Xóa sản phẩm thành công' });
  } catch (error) {
    res.status(400).json({ error: 'Lỗi xóa sản phẩm' });
  }
};