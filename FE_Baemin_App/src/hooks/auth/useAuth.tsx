"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  email: string;
  login: (accessToken: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedEmail = localStorage.getItem("email");

    if (token && savedEmail) {
      setIsLoggedIn(true);
      setEmail(savedEmail);
    }
  }, []);

  const login = (accessToken: string, email: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("email", email);
    setIsLoggedIn(true);
    setEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    setEmail("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        email,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
