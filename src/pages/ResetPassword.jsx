import { useState, useEffect } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";

import useAuthContext from "../context/AuthContext";
import axios from "../api/axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [searchParams] = useSearchParams();
  const { token } = useParams();

  const { csrf } = useAuthContext();

  useEffect(() => {
    setEmail(searchParams.length("email"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();
    setErrors([]);
    setStatus(null);

    try {
      const response = await axios.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation,
      });
      setStatus(response.data.status);
    } catch (err) {
      if (err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
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
              {status && (
                <div className="bg-green-700 m-2 p-2 rounded text-white">
                  {status}
                  <div className="m-2 p-2">
                    去<Link to="/login">登入</Link>！
                  </div>
                </div>
              )}
              <div className="mb-10 text-center md:mb-16">輸入新的密碼</div>
              <form onSubmit={handleSubmit}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
