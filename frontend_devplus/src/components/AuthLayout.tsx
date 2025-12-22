import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    // Nền ngoài: Thêm py-10 để đảm bảo có khoảng trống khi màn hình nhỏ
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f9fafb] p-4 py-10 font-sans">
      
      
      {/* Khung ngoài: Thêm my-4 để tạo margin dọc */}
      <div className="w-full max-w-[420px] p-16 my-4">
        {children}
      </div>
      

    </div>
  );
};

export default AuthLayout;