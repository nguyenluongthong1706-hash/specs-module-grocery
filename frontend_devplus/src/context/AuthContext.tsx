import { createContext, useState, useContext, type ReactNode } from "react";
import { authService } from "../services/authService";

// 1. Định nghĩa "khuôn mẫu" dữ liệu cho Context
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string;
  setToken: (token: string) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Duy trì đăng nhập khi F5 trang bằng cách lấy từ localStorage
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem("token", response.token);
  };

  const register = async (name: string, email: string, password: string) => {
    await authService.register({ name, email, password });
    // After register, maybe auto login or just navigate to login
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};