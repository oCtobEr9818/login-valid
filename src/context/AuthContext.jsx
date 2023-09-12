import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import axios from "../api/loginValidApi";
import Loading from "../components/Loading";

const AuthContext = createContext({});

// 比較漂亮的alert
const ReactSwal = withReactContent(Swal);

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
      console.error(err);
    }
  };

  // 按下登入、登出、註冊的等待畫面
  const loadingSwal = async (text) => {
    await ReactSwal.fire({
      title: <i>{text}中</i>,
      didOpen: () => {
        ReactSwal.showLoading();
      },
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  };
  // 按下登入、登出、註冊後的成功訊息
  const commonSwal = async (text) => {
    return ReactSwal.fire({
      icon: "success",
      title: `${text}成功！`,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: 1500,
    });
  };

  const login = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    loadingSwal("登入");

    try {
      await axios.post("/login", data);
      await getUser();

      commonSwal("登入");
      navigate("/");

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
    loadingSwal("註冊");

    try {
      await axios.post("/register", data);
      await getUser();

      commonSwal("註冊");
      navigate("/");

      localStorage.setItem("userLoggedIn", "true");
    } catch (err) {
      if (err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const logout = () => {
    try {
      axios.post("/logout").then(() => {
        setUser(null);
        commonSwal("登出");

        localStorage.removeItem("userLoggedIn");
      });
    } catch (err) {
      console.error(err);
    }
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
