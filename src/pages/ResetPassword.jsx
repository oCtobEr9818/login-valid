import { useState, useEffect } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";

import useAuthContext from "../context/AuthContext";
import axios from "../api/loginValidApi";
import Input from "../components/Input";

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
    setEmail(searchParams.get("email"));
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
              {status && (
                <>
                  <div className="bg-green-800 m-2 p-2 rounded text-white">
                    {status}
                  </div>
                  <div className="m-2 p-2">
                    去
                    <Link
                      to="/login"
                      className="underline hover:text-red-500 font-bold"
                    >
                      登入
                    </Link>
                  </div>
                </>
              )}
              <div className="mb-10 text-center md:mb-16">輸入新的密碼</div>
              <form onSubmit={handleSubmit}>
                <div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="密碼"
                    errors={errors.password}
                    errorsMessage={errors.password?.[0]}
                  />
                </div>

                <div>
                  <Input
                    id="passwordConfirmation"
                    type="password"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    label="再次確認密碼"
                    errors={errors.password}
                    errorsMessage={errors.password?.[0]}
                  />
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
