import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Card, Space } from 'antd';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService'; //

interface Category {
  id: string;
  name: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories(); //
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

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      message.success('Xóa phân loại thành công');
      fetchCategories();
    } catch (error) {
      message.error('Lỗi khi xóa phân loại');
    }
  };

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
    {
      title: 'Mã phân loại (ID)',
      dataIndex: 'id',
      key: 'id',
      width: '30%',
    },
    {
      title: 'Tên phân loại',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Category) => (
        <Space size="middle">
          <Button type="link" onClick={() => {
            setEditingCategory(record);
            form.setFieldsValue({ name: record.name });
            setIsModalVisible(true);
          }}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => handleDeleteCategory(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Quản lý phân loại hàng hóa" extra={
        <Button type="primary" onClick={() => {
          setEditingCategory(null);
          form.resetFields();
          setIsModalVisible(true);
        }}>
          Thêm phân loại mới
        </Button>
      }>
        <Table
          columns={columns}
          dataSource={categories}
          loading={loading}
          rowKey="id"
          bordered
        />
      </Card>

      <Modal
        title={editingCategory ? "Sửa phân loại" : "Tạo phân loại mới"}
        open={isModalVisible} // Đổi từ visible sang open cho chuẩn Antd v5
        onCancel={() => {
          setIsModalVisible(false);
          setEditingCategory(null);
          form.resetFields();
        }}
        onOk={() => form.submit()} // Tận dụng nút OK của Modal để submit form
        okText="Lưu lại"
        cancelText="Hủy bỏ"
      >
        <Form form={form} layout="vertical" onFinish={handleSaveCategory}>
          <Form.Item
            name="name"
            label="Tên phân loại"
            rules={[{ required: true, message: 'Vui lòng nhập tên phân loại!' }]}
          >
            <Input placeholder="Ví dụ: Đồ điện tử, Thời trang..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;