import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Button, Modal, Form, message, Space, Popconfirm, Card, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  AppstoreOutlined, 
  ShoppingOutlined, 
  LineChartOutlined 
} from '@ant-design/icons';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import { getCategories } from '../services/categoryService';
import { formatCurrency } from '../utils/formatCurrency';
import ProductForm from '../components/ProductForm';

const { Header, Content, Sider } = Layout;

const Products: React.FC = () => {
  const { token: { colorBgContainer } } = theme.useToken();
  const location = useLocation();
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

  const menuItems = [
    {
      key: '/dashboard',
      icon: <LineChartOutlined />,
      label: <Link to="/dashboard">Báo cáo tổng quan</Link>,
    },
    {
      key: '/categories',
      icon: <AppstoreOutlined />,
      label: <Link to="/categories">Quản lý phân loại</Link>,
    },
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: <Link to="/products">Quản lý sản phẩm</Link>,
    },
  ];

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        price: Number(values.price),
        stock: Number(values.stock),
        categoryId: Number(values.categoryId),
        image: values.image || ""
      };

      if (editingProduct) {
        await updateProduct(Number(editingProduct.id), payload);
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
      message.error(error.response?.data?.message || 'Lỗi lưu dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (url: string) => (
        <div className="flex justify-center">
          <img 
            src={url || 'https://via.placeholder.com/50'} 
            alt="product" 
            className="w-12 h-12 object-cover rounded-lg border border-gray-200 shadow-sm"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50'; }}
          />
        </div>
      ),
    },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name', className: 'font-medium text-gray-700' },
    { 
      title: 'Giá bán', 
      dataIndex: 'price', 
      render: (v: number) => <span className="text-blue-600 font-bold">{formatCurrency(v)}</span> 
    },
    { 
      title: 'Tồn kho', 
      dataIndex: 'stock', 
      key: 'stock', 
      render: (s: number) => (
        <span className={s < 10 ? "text-red-500 font-black" : "text-gray-600 font-semibold"}>
          {s}
        </span>
      ) 
    },
    { 
      title: 'Loại', 
      dataIndex: 'categoryId', 
      render: (id: number) => (
        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">
          {categories.find(c => c.id === id)?.name || 'N/A'}
        </span>
      )
    },
    { 
      title: 'Thao tác', 
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button 
            type="text" 
            className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
            icon={<EditOutlined />} 
            onClick={() => {
              setEditingProduct(record);
              form.setFieldsValue(record);
              setIsModalOpen(true);
            }}
          >Sửa</Button>
          <Popconfirm 
            title="Xác nhận xóa sản phẩm?" 
            description="Hành động này không thể hoàn tác."
            onConfirm={() => deleteProduct(Number(record.id)).then(loadData)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" danger icon={<DeleteOutlined />} className="flex items-center gap-1">Xóa</Button>
          </Popconfirm>
        </Space>
      ) 
    }
  ];

  return (
    <Layout className="min-h-screen">
      <Sider collapsible className="fixed h-screen left-0 z-20 shadow-xl">
        <div className="h-10 m-4 bg-white/10 rounded-lg flex items-center justify-center border border-white/5">
          <span className="text-white font-black tracking-tighter text-sm">STORE MS</span>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} className="border-none" />
      </Sider>

      <Layout className="ml-[10px] transition-all duration-300">
        <Header 
          className="p-0 flex items-center justify-center border-b border-gray-100 sticky top-0 z-10 shadow-sm" 
          style={{ background: colorBgContainer }}
        >
          <h1 className="!text-xl !font-black !m-0 pt-4 text-gray-800 tracking-tight">
            QUẢN LÝ SẢN PHẨM
          </h1>
        </Header>

        <Content className="p-8 lg:p-12 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto">
            <Card 
              className="shadow-xl rounded-3xl border-none overflow-hidden"
              title={<span className="text-xl font-extrabold text-gray-800">Kho hàng sản phẩm</span>}
              extra={
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  className="rounded-xl h-12 px-6 font-bold shadow-lg shadow-blue-200 hover:scale-105 transition-transform"
                  onClick={() => { setEditingProduct(null); form.resetFields(); setIsModalOpen(true); }}
                >
                  Thêm mới
                </Button>
              }
            >
              <Table 
                dataSource={products} 
                columns={columns} 
                rowKey="id" 
                loading={loading} 
                bordered={false}
                pagination={{ pageSize: 7 }}
                className="rounded-2xl"
              />
            </Card>
          </div>
        </Content>
      </Layout>

      <Modal 
        title={<span className="text-xl font-bold">{editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</span>} 
        open={isModalOpen} 
        onOk={() => form.submit()} 
        onCancel={() => { setIsModalOpen(false); setEditingProduct(null); form.resetFields(); }}
        confirmLoading={loading}
        width={650}
        centered
        className="rounded-3xl overflow-hidden"
      >
        <div className="pt-6 border-t border-gray-50">
          <ProductForm form={form} categories={categories} onFinish={handleSave} />
        </div>
      </Modal>
    </Layout>
  );
};

export default Products;