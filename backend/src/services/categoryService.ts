import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: { products: true }, 
  });
};

export const createCategory = async (name: string, description?: string) => {
  return await prisma.category.create({
    data: { name, description },
  });
};

export const updateCategory = async (id: number, name: string, description?: string) => {
  return await prisma.category.update({
    where: { id },
    data: { name, description },
  });
};

export const deleteCategory = async (id: number) => {

  const countProducts = await prisma.product.count({ where: { categoryId: id } });
  if (countProducts > 0) {
    throw new Error("Không thể xóa danh mục này vì đang chứa sản phẩm!");
  }
  
  return await prisma.category.delete({ where: { id } });
};