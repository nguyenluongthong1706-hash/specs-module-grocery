import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FormCard from './FormCard';

interface RegisterFormProps {
  onRegister: (values: { name: string; email: string; password: string; confirmPassword: string }) => void;
  loading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, loading = false }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onRegister(values);
  };

  // Style chung cho tất cả input để code sạch hơn
  // const inputStyles = "h-12 rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all";

  return (
    <FormCard title="Đạo Tạo Tài Khoản">
      <Form
        form={form}
        name="register"
        onFinish={handleFinish}
        layout="vertical"
        requiredMark={false} // Ẩn dấu * đỏ để giao diện sạch hơn
        className="space-y-1" // Giảm space-y vì gap sẽ do Form.Item quản lý
      >
        <Form.Item
          name="name"
          label={<span className="font-medium text-gray-700">Họ và tên</span>}
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          className="mb-4"
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Nguyễn Văn A"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="font-medium text-gray-700">Email</span>}
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
          className="mb-4"
        >
          <Input
            size="large"
            prefix={<MailOutlined />}
            placeholder="example@gmail.com"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="font-medium text-gray-700">Mật khẩu</span>}
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Tối thiểu 6 ký tự!' },
          ]}
          className="mb-4"
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="••••••••"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={<span className="font-medium text-gray-700">Xác nhận mật khẩu</span>}
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'));
              },
            }),
          ]}
          className="mb-6"
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="••••••••"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Đăng Ký Ngay
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-6 text-gray-500">
        <span>Đã có tài khoản? </span>
        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold underline-offset-4 hover:underline">
          Đăng nhập
        </Link>
      </div>
    </FormCard>
  );
};

export default RegisterForm;