import React from 'react';
import { Layout, theme, Typography, Button } from 'antd';
import { ShoppingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

interface AppHeaderProps {
  title?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title = "Hệ thống quản lý kho" }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header 
      className="flex items-center justify-between px-6 shadow-md sticky top-0 z-10"
      style={{ background: colorBgContainer }} 
    >
      <div className="flex items-center gap-3">
        <ShoppingOutlined className="text-2xl text-blue-500" />
        <Title level={4} className="!m-0 text-gray-800">{title}</Title>
      </div>

      <div className="flex items-center gap-4">
        <Button 
          icon={<UserOutlined />} 
          type="text" 
          className="hover:text-blue-500"
        >
          Admin
        </Button>
        <Button 
          icon={<LogoutOutlined />} 
          type="text" 
          danger 
          className="flex items-center"
          onClick={() => console.log('Đăng xuất')}
        >
          Đăng xuất
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;