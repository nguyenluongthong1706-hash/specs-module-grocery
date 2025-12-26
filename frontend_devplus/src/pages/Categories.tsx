import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, Table, Button, Modal, Form, Input, message, Card, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppstoreOutlined, 
  ShoppingOutlined, 
  LineChartOutlined,
  PlusOutlined 
} from '@ant-design/icons';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';

const { Header, Content, Sider } = Layout;

interface Category {
  id: string;
  name: string;
}

const Categories: React.FC = () => {
  const { token: { colorBgContainer } } = theme.useToken();
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      message.error('Không thể tải danh sách phân loại');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleSaveCategory = async (values: { name: string }) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, values.name);
        message.success('Cập nhật phân loại thành công');
      } else {
        await createCategory(values.name);
        message.success('Thêm phân loại thành công');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      message.error('Lỗi khi lưu phân loại');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: '20%' },
    { title: 'Tên phân loại', dataIndex: 'name', key: 'name', className: 'font-medium' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Category) => (
        <Space size="middle">
          <Button type="link" onClick={() => {
            setEditingCategory(record);
            form.setFieldsValue({ name: record.name });
            setIsModalVisible(true);
          }}>Sửa</Button>
          <Button type="link" danger onClick={() => deleteCategory(record.id).then(fetchCategories)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider collapsible className="fixed h-screen left-0 z-20">
        <div className="h-8 m-4 bg-white/20 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-[10px]">ADMIN SYSTEM</span>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>
      <Layout className="ml-[10px] transition-all duration-300">
        <Header className="p-0 flex items-center justify-center border-b border-gray-100" style={{ background: colorBgContainer }}>
          <h1 className="!text-xl !font-bold !m-0 pt-4 text-gray-800">Quản Lý Phân Loại</h1>
        </Header>

        <Content className="p-8 bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto">
            <Card 
              title={<span className="text-lg font-bold">Danh mục hàng hóa</span>} 
              className="shadow-md rounded-2xl overflow-hidden"
              extra={
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  className="rounded-lg h-10 flex items-center shadow-lg shadow-blue-200"
                  onClick={() => { setEditingCategory(null); form.resetFields(); setIsModalVisible(true); }}
                >
                  Thêm mới
                </Button>
              }
            >
              <Table
                columns={columns}
                dataSource={categories}
                loading={loading}
                rowKey="id"
                bordered
                pagination={{ pageSize: 8 }}
              />
            </Card>
          </div>
        </Content>
      </Layout>

      <Modal
        title={editingCategory ? "Sửa phân loại" : "Tạo phân loại mới"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveCategory} className="pt-4">
          <Form.Item
            name="name"
            label="Tên phân loại"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input placeholder="Ví dụ: Đồ điện tử..." className="h-10" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Categories;