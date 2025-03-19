import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = Cookies.get("token");
    return token ? { token } : null;
  });

  useEffect(() => {
    console.log("User Updated:", user);
  }, [user]);

  const login = (token) => {
    Cookies.set("token", token, { secure: true, expires: 1 });
    setUser({ token });
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
