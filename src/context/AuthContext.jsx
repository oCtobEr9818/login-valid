import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/loginValidApi";
import Loading from "../components/Loading";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user");
      setUser(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const login = async ({ ...data }) => {
    await csrf();
    setErrors([]);

    try {
      await axios.post("/login", data);
      await getUser();

      navigate("/");
      alert("登入成功！");

      localStorage.setItem("userLoggedIn", "true");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const register = async ({ ...data }) => {
    await csrf();
    setErrors([]);

    try {
      await axios.post("/register", data);
      await getUser();
      navigate("/");
      alert("註冊成功！");

      localStorage.setItem("userLoggedIn", "true");
    } catch (err) {
      if (err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const logout = () => {
    axios.post("/logout").then(() => {
      alert("已登出~");
      setUser(null);

      localStorage.removeItem("userLoggedIn");
    });
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ user, errors, getUser, login, register, logout, csrf }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
