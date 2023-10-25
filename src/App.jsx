import { BrowserRouter } from "react-router-dom";
import { motion } from "framer-motion";

import AnimatedRoutes from "./components/AnimatedRoutes";
import { motionVariants } from "./motionSettings";

export default function App() {
  return (
    <motion.div
      className="bg-body min-h-screen w-full m-0 p-0 overflow-hidden"
      variants={motionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5, type: "linear" }}
    >
      <BrowserRouter basename="/">
        <AnimatedRoutes />
      </BrowserRouter>
    </motion.div>
  );
}
