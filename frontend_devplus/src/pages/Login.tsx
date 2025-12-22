import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginForm onLogin={handleLogin} loading={loading} />
    </AuthLayout>
  );
};

export default Login;