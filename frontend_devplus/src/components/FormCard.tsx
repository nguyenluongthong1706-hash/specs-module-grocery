import React from 'react';
import { Card } from 'antd';

interface FormCardProps {
  title: string;
  children: React.ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({ title, children }) => {
  return (
    <Card
      title={<div className="text-center text-2xl font-bold">{title}</div>}
      bordered={false}
      className="shadow-lg"
      bodyStyle={{ padding: '2rem' }}
    >
      {children}
    </Card>
  );
};

export default FormCard;