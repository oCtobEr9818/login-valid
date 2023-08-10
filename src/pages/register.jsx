import { useState } from "react";
import { Link } from "react-router-dom";

import useAuthContext from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const { errors, register } = useAuthContext();

  const handleRegister = async (e) => {
    e.preventDefault();
    register({ name, email, password, password_confirmation });
  };

  return (
    <>
      <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
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
                  <div className="mb-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="使用者名稱"
                      className="
                bordder-[#E9EDF4]
                w-full
                rounded-md
                border
                bg-[#FCFDFE]
                py-3
                px-5
                text-base text-body-color
                placeholder-[#ACB6BE]
                outline-none
                focus:border-primary
                focus-visible:shadow-none
              "
                    />
                    <div className="flex">
                      {errors.name && (
                        <span className="text-red-400 text-sm m-2 p-2">
                          {errors.name[0]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="電子信箱"
                      className="
                bordder-[#E9EDF4]
                w-full
                rounded-md
                border
                bg-[#FCFDFE]
                py-3
                px-5
                text-base text-body-color
                placeholder-[#ACB6BE]
                outline-none
                focus:border-primary
                focus-visible:shadow-none
              "
                    />
                    <div className="flex">
                      {errors.email && (
                        <span className="text-red-400 text-sm m-2 p-2">
                          {errors.email[0]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="密碼"
                      className="
                bordder-[#E9EDF4]
                w-full
                rounded-md
                border
                bg-[#FCFDFE]
                py-3
                px-5
                text-base text-body-color
                placeholder-[#ACB6BE]
                outline-none
                focus:border-primary
                focus-visible:shadow-none
              "
                    />
                    <div className="flex">
                      {errors.password && (
                        <span className="text-red-400 text-sm m-2 p-2">
                          {errors.password[0]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      value={password_confirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      placeholder="再次確認密碼"
                      className="
                bordder-[#E9EDF4]
                w-full
                rounded-md
                border
                bg-[#FCFDFE]
                py-3
                px-5
                text-base text-body-color
                placeholder-[#ACB6BE]
                outline-none
                focus:border-primary
                focus-visible:shadow-none
              "
                    />
                    <div className="flex">
                      {errors.password && (
                        <span className="text-red-400 text-sm m-2 p-2">
                          {errors.password[0]}
                        </span>
                      )}
                    </div>
                  </div>
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
            hover:text-primary hover:underline
          "
                >
                  忘記密碼?
                </Link>
                <p className="text-base text-[#adadad]">
                  已經註冊了嗎?
                  <Link to="/login" className="text-primary hover:underline">
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
