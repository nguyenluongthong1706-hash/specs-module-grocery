import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (values: { name: string; email: string; password: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      await register(values.name, values.email, values.password);
      navigate('/login');
    } catch (error) {
      console.error('Register failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <RegisterForm onRegister={handleRegister} loading={loading} />
    </AuthLayout>
  );
};

export default Register;