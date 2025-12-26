import React, { useEffect, useState } from 'react';
import { Layout, Menu, theme, Row, Col, Card, Statistic, Spin } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppstoreOutlined, 
  ShoppingOutlined, 
  LineChartOutlined,
  DollarCircleOutlined 
} from '@ant-design/icons';
import { getAllProducts } from '../services/productService'; 
import { getCategories } from '../services/categoryService'; 
import { formatCurrency } from '../utils/formatCurrency'; 

const { Header, Content, Sider } = Layout;

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalValue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, categories] = await Promise.all([
          getAllProducts(),
          getCategories()
        ]);

        const totalValue = products.reduce((sum: number, p: any) => sum + (Number(p.price) || 0), 0);

        setStats({
          totalProducts: products.length,
          totalCategories: categories.length,
          totalValue: totalValue
        });
      } catch (error) {
        console.error("Lỗi tải báo cáo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
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

  return (
    <Layout className="min-h-screen">
      {/* Sider cố định bên trái - Chiều rộng mặc định là 200px */}
      <Sider collapsible className="fixed h-screen left-0 z-20">
        <div className="h-8 m-4 bg-white/20 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-[10px]">ADMIN SYSTEM</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>

      <Layout className="ml-[10px] transition-all duration-300">
        <Header 
          className="p-0 flex items-center justify-center border-b border-gray-100" 
          style={{ background: colorBgContainer }}
        >
          <h1 className="!text-xl !font-bold !m-0 pt-4 text-gray-800">
            Hệ thống quản lý kho
          </h1>
        </Header>

        <Content className="p-2 bg-[#f8fafc]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-10 border-l-4 border-blue-600 pl-4 text-gray-700">
                Báo cáo thống kê
              </h2>

              <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={8}>
                <Card bordered={false} hoverable className="shadow-md rounded-2xl border-t-4 border-blue-500">
                  <Statistic
                    title={<span className="text-gray-400 font-bold text-xs uppercase">Tổng sản phẩm</span>}
                    value={stats.totalProducts}
                    prefix={<ShoppingOutlined className="text-blue-600 mr-2" />}
                    valueStyle={{ color: '#3b82f6', fontWeight: 800, fontSize: '2rem' }} 
                  />
                </Card>
              </Col>

              <Col xs={24} sm={12} lg={8}>
                <Card bordered={false} hoverable className="shadow-md rounded-2xl border-t-4 border-red-500">
                  <Statistic
                    title={<span className="text-gray-400 font-bold text-xs uppercase">Phân loại</span>}
                    value={stats.totalCategories}
                    prefix={<AppstoreOutlined className="text-red-500 mr-2" />}
                    valueStyle={{ color: '#ef4444', fontWeight: 800, fontSize: '2rem' }}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={24} lg={8}>
                <Card bordered={false} hoverable className="shadow-md rounded-2xl border-t-4 border-green-500">
                  <Statistic
                    title={<span className="text-gray-400 font-bold text-xs uppercase">Giá trị tồn kho</span>}
                    value={stats.totalValue}
                    formatter={(val) => formatCurrency(Number(val))}
                    prefix={<DollarCircleOutlined className="text-green-600 mr-2" />}
                    valueStyle={{ color: '#10b981', fontWeight: 800, fontSize: '1.8rem' }}
                  />
                </Card>
              </Col>
            </Row>

              <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">Gợi ý làm việc</h3>
                <p className="text-gray-500 mt-2">
                  Hệ thống đang vận hành ổn định. Bạn có thể nhấn vào <b>Quản lý sản phẩm</b> để thêm mới hàng hóa.
                </p>
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;