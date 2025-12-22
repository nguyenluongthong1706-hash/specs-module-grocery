import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Modal, Form, message, Space, Popconfirm, Card, theme } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import { getCategories } from '../services/categoryService';
import { formatCurrency } from '../utils/formatCurrency';
import ProductForm from '../components/ProductForm';
import AppHeader from '../components/AppHeader';

const { Content } = Layout;

const Products: React.FC = () => {
  const { token: { borderRadiusLG } } = theme.useToken();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [form] = Form.useForm();

  const loadData = async () => {
    setLoading(true);
    try {
      const [p, c] = await Promise.all([getAllProducts(), getCategories()]);
      setProducts(p);
      setCategories(c);
    } catch (error) {
      message.error('Lỗi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      // 1. Chuẩn bị Payload với kiểu dữ liệu chuẩn Prisma (Number)
      const payload = {
        name: values.name,
        price: Number(values.price),
        stock: Number(values.stock),
        categoryId: Number(values.categoryId),
        image: values.image || ""
      };

      if (editingProduct) {
        // 2. Ép kiểu ID sang Number khi gọi update
        const productId = Number(editingProduct.id);
        await updateProduct(productId, payload);
        message.success('Cập nhật thành công');
      } else {
        await addProduct(payload);
        message.success('Thêm mới thành công');
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingProduct(null);
      loadData();
    } catch (error: any) {
      // Hiển thị lỗi chi tiết từ Backend (nếu có)
      const errorMsg = error.response?.data?.message || 'Lỗi 400: Kiểm tra lại dữ liệu';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Giá', dataIndex: 'price', render: (v: number) => formatCurrency(v) },
    { title: 'Số lượng', dataIndex: 'stock', key: 'stock' },
    { 
      title: 'Loại', 
      dataIndex: 'categoryId', 
      render: (id: number) => categories.find(c => c.id === id)?.name || 'N/A' 
    },
    { 
      title: 'Thao tác', 
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => {
            setEditingProduct(record);
            form.setFieldsValue(record);
            setIsModalOpen(true);
          }}>Sửa</Button>
          <Popconfirm title="Xóa?" onConfirm={() => deleteProduct(Number(record.id)).then(loadData)}>
            <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      ) 
    }
  ];

  return (
    <Layout className="min-h-screen bg-gray-50">
      <AppHeader title="Quản lý Kho hàng" />
      <Content className="p-6">
        <Card 
          title="Danh sách sản phẩm"
          extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingProduct(null); form.resetFields(); setIsModalOpen(true); }}>Thêm mới</Button>}
          style={{ borderRadius: borderRadiusLG }}
        >
          <Table dataSource={products} columns={columns} rowKey="id" loading={loading} bordered />
        </Card>
      </Content>
      <Modal 
        title={editingProduct ? "Sửa sản phẩm" : "Thêm mới"} 
        open={isModalOpen} 
        onOk={() => form.submit()} 
        onCancel={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
          form.resetFields();
        }}
        confirmLoading={loading}
      >
        <ProductForm form={form} categories={categories} onFinish={handleSave} />
      </Modal>
    </Layout>
  );
};

export default Products;