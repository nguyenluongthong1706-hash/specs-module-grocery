import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FormCard from './FormCard';

interface LoginFormProps {
  onLogin: (values: { email: string; password: string }) => void;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading = false }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onLogin(values);
  };

  return (
    <FormCard title="Đăng Nhập">
      <Form
        form={form}
        name="login"
        onFinish={handleFinish}
        layout="vertical"
        requiredMark={false}
        className="space-y-4"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Nhập email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật Khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu"
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
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center mt-4">
        <span>Chưa có tài khoản? </span>
        <Link to="/register" className="text-blue-500 hover:text-blue-700">Đăng ký ngay</Link>
      </div>
    </FormCard>
  );
};

export default LoginForm;