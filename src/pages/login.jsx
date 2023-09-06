import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useAuthContext from "../context/AuthContext";
import Input from "../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { login, errors } = useAuthContext();

  useEffect(() => {
    if (localStorage.rememberEmail && localStorage.email !== "") {
      setIsChecked(true);
      setEmail(localStorage.email);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // 記住帳號
    if (isChecked && email !== "") {
      localStorage.email = email;
      localStorage.rememberEmail = isChecked;
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("rememberEmail");
    }

    login({ email, password });
  };

  return (
    <>
      <section className="bg-body py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center font-bold text-[24px] md:mb-16">
                  ESS系統登入
                </div>

                <form onSubmit={handleLogin}>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="電子信箱"
                    errors={errors.email}
                    errorsMessage={errors.email?.[0]}
                  />

                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="密碼"
                    errors={errors.password}
                    errorsMessage={errors.password?.[0]}
                  />

                  <div className="pl-2 mb-6 text-left">
                    <input
                      id="rememberEmail"
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="w-4 h-4 align-middle"
                    />
                    <label
                      htmlFor="rememberEmail"
                      className="ml-2 align-middle select-none"
                    >
                      記住帳號
                    </label>
                  </div>

                  <div className="mb-10">
                    <button
                      type="submit"
                      className="
                        w-full
                        px-4
                        py-3
                        rounded-md
                        bg-indigo-500
                        hover:bg-indigo-700
                        text-white
                      "
                    >
                      登入
                    </button>
                  </div>
                </form>
                <Link
                  to="/forgot-password"
                  className="
                    mb-2
                    inline-block
                    text-base text-[#adadad]
                    hover:text-primary
                    hover:text-red-600
                    hover:underline
                  "
                >
                  忘記密碼?
                </Link>
                <p className="text-base text-[#adadad]">
                  還沒註冊嗎?
                  <Link
                    to="/register"
                    className="text-primary hover:underline hover:text-red-600"
                  >
                    立即註冊
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
