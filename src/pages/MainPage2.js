import { motion } from "framer-motion";

const MainPage2 = () => {
  return (
    <div className="main-bg">
      <motion.div
        className="main-wrapper"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}></motion.div>
      <div>MainPage2</div>
    </div>
  );
};

export default MainPage2;
