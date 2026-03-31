import { motion } from "framer-motion";
import "../assets/loader.css";

const Loader = () => {
  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    ></motion.div>
  );
};

export default Loader;
