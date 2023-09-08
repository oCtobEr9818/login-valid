import { Navigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import useAuthContext from "../context/AuthContext";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { motionVariants } from "../motionSettings";

const AuthLayout = () => {
  const { user } = useAuthContext();

  return user ? (
    <div className="min-h-screen w-full m-0 p-0 flex">
      <SideBar />

      <div className="flex flex-col w-full bg-body relative">
        <Nav />

        <motion.div
          variants={motionVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.5, type: "linear" }}
        >
          <Outlet />
        </motion.div>

        <Footer />
      </div>
    </div>
  ) : (
    <motion.div
      variants={motionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5, type: "linear" }}
    >
      <Navigate to="/login" />
    </motion.div>
  );
};

export default AuthLayout;
