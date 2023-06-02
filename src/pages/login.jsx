import { useState } from "react";
import axios from "axios";
import { Input, Button } from "@geist-ui/core";

import { Layout } from "../components/layout";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async () => {
    await axios
      .get("http://127.0.0.1:8000/sanctum/csrf-cookie")
      .then((response) => {
        const logined = axios.post("http://127.0.0.1:8000/login", {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": "meta[name='csrf-token']",
          },
          data: JSON.stringify({
            username: userName,
            account: account,
            password: password,
          }),
        });

        if (isLogin) {
          window.location.href = "/login/isLogin";
        }

        if (logined.status === 200 || logined.status === 204) {
          console.log(logined);
          // setIsLogin(true);
        } else if (logined.status === 404) {
          console.log(logined);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("帳號密碼有誤!");
      });
  };

  return (
    <Layout>
      <div className="Login">
        <div className="input-wrap">
          <span>使用者名稱：</span>

          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="請輸入使用者名稱"
          />
        </div>

        <div className="input-wrap">
          <span>信箱：</span>

          <Input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="請輸入帳號"
          />
        </div>

        <div className="input-wrap">
          <span>密碼：</span>

          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="請輸入密碼"
          />
        </div>

        <Button auto type="success-light" onClick={handleSubmit}>
          登入
        </Button>
      </div>
    </Layout>
  );
}
