import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async (keyword?: string) => {
  // Logic tìm kiếm: Nếu có từ khóa thì tìm theo tên, không thì lấy hết
  const whereClause = keyword 
    ? { name: { contains: keyword, mode: 'insensitive' as const } } // 'insensitive': không phân biệt hoa thường
    : {};

  return await prisma.product.findMany({
    where: whereClause,
    include: {
      category: true, // Lấy kèm thông tin Category (Giống JOIN trong SQL)
    },
    orderBy: { createdAt: 'desc' } // Mới nhất lên đầu
  });
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
};

export const createProduct = async (data: {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
  description?: string;
  image?: string;
}) => {
  return await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock,
      categoryId: data.categoryId, // Liên kết khóa ngoại
      description: data.description,
      image: data.image,
    },
  });
};

export const updateProduct = async (id: number, data: any) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  });
};