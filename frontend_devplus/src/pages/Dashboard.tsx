import React, { useEffect, useState } from 'react';
import { Layout, Menu, theme, Row, Col, Card, Statistic, Spin } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppstoreOutlined, 
  ShoppingOutlined, 
  LineChartOutlined,
  DollarCircleOutlined 
} from '@ant-design/icons';
import { getAllProducts } from '../services/productService'; //
import { getCategories } from '../services/categoryService'; //
import { formatCurrency } from '../utils/formatCurrency'; //

const { Header, Content, Sider } = Layout;

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalValue: 0
  });

  // Tải dữ liệu để làm báo cáo
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, categories] = await Promise.all([
          getAllProducts(),
          getCategories()
        ]);

        // Tính toán số liệu báo cáo
        const totalValue = products.reduce((sum: number, p: any) => sum + (p.price || 0), 0);

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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <h1 style={{ margin: '0 24px', fontSize: '20px' }}>Hệ thống quản lý kho</h1>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
          ) : (
            <>
              <h2 style={{ marginBottom: '24px' }}>Báo cáo thống kê</h2>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                  <Card bordered={false} hoverable>
                    <Statistic
                      title="Tổng số sản phẩm"
                      value={stats.totalProducts}
                      prefix={<ShoppingOutlined />}
                      valueStyle={{ color: '#3f51b5' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Card bordered={false} hoverable>
                    <Statistic
                      title="Số lượng phân loại"
                      value={stats.totalCategories}
                      prefix={<AppstoreOutlined />}
                      valueStyle={{ color: '#cf1322' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={24} lg={8}>
                  <Card bordered={false} hoverable>
                    <Statistic
                      title="Tổng giá trị tồn kho (ước tính)"
                      value={stats.totalValue}
                      formatter={(val) => formatCurrency(Number(val))} //
                      prefix={<DollarCircleOutlined />}
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
              </Row>

              <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
                <h3>Gợi ý làm việc</h3>
                <p>Bạn có thể nhấn vào <b>Quản lý sản phẩm</b> để thêm mới hàng hóa vào kho.</p>
              </div>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;