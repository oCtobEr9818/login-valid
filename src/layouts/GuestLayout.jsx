import { Navigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import useAuthContext from "../context/AuthContext";
import { motionVariants } from "../motionSettings";

const GuestLayout = () => {
  const { user } = useAuthContext();

  return !user ? (
    <motion.div
      variants={motionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5, type: "linear" }}
    >
      <Outlet />
    </motion.div>
  ) : (
    <motion.div>
      <Navigate
        to="/login"
        variants={motionVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.5, type: "linear" }}
      />
    </motion.div>
  );
};

export default GuestLayout;
