import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";

const AuthLayout = () => {
  const { user } = useAuthContext();

  return user ? (
    <div className="min-h-screen w-full m-0 p-0 flex">
      <SideBar />

      <div className="flex flex-col w-full bg-body">
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthLayout;
