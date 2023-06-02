import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import IsLogin from "./pages/isLogin";
import { Nav } from "./components/nav";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/isLogin" element={<IsLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
