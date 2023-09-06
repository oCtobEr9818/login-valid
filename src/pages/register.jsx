import { useState } from "react";
import { Link } from "react-router-dom";

import useAuthContext from "../context/AuthContext";
import Input from "../components/Input";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { errors, register } = useAuthContext();

  const handleRegister = async (e) => {
    e.preventDefault();
    register({ userName, email, password, passwordConfirmation });
  };

  return (
    <>
      <section className="bg-body py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="
                  relative
                  mx-auto
                  max-w-[525px]
                  overflow-hidden
                  rounded-lg
                  bg-white
                  py-16
                  px-10
                  text-center
                  sm:px-12
                  md:px-[60px]
                "
              >
                <div className="mb-10 text-center md:mb-16">帳號註冊</div>
                <form onSubmit={handleRegister}>
                  <Input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    label="使用者名稱"
                    errors={errors.name}
                    errorsMessage={errors.name?.[0]}
                  />

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

                  <Input
                    id="passwordConfirmation"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    label="再次確認密碼"
                    errors={errors.password}
                    errorsMessage={errors.password?.[0]}
                  />

                  <div className="mb-10">
                    <button
                      type="submit"
                      className="
                        w-full
                        px-4
                        py-3
                        bg-indigo-500
                        hover:bg-indigo-700
                        rounded-md
                        text-white
                      "
                    >
                      送出
                    </button>
                  </div>
                </form>
                <Link
                  to="/forgot-password"
                  className="
                    mb-2
                    inline-block
                    text-base text-[#adadad]
                    text-primary hover:underline hover:text-red-600
                  "
                >
                  忘記密碼?
                </Link>
                <p className="text-base text-[#adadad]">
                  已經註冊了嗎?
                  <Link
                    to="/login"
                    className="text-primary hover:underline hover:text-red-600"
                  >
                    立即登入
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

export default Register;
