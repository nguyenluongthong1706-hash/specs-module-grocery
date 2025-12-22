import { createContext, useState, useContext, type ReactNode } from "react";

// 1. Định nghĩa "khuôn mẫu" dữ liệu cho Context
interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  token: string;
  setToken: (token: string) => void;
  logout: () => void;
}

// 2. Tạo Context với kiểu dữ liệu đã định nghĩa
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Duy trì đăng nhập khi F5 trang bằng cách lấy từ localStorage
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};