import { createContext, useState, useEffect } from "react";

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const auth = {
    accessToken,
    setAccessToken,
  };

  return (
    <AuthContext.Provider value={{ auth: auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext();
