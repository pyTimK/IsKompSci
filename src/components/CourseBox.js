import clsx from "clsx";
import { motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import CrossFadePageContext from "../contexts/CrossFadePageContext";

const CourseBox = ({ course, handleCourseTap, subject, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);
  const divRef = useRef();

  const divFullScreenAnimate = useContext(CrossFadePageContext);

  //TODO: MEMOIZE THIS
  const exitAnimate = async () => {
    const domRect = divRef.current.getBoundingClientRect();
    divFullScreenAnimate.set({
      x: domRect.x,
      y: domRect.y,
      width: domRect.width,
      height: domRect.height,
      backgroundColor: `var(--${status}Color)`,
    });
    await divFullScreenAnimate.start({
      opacity: 1,
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,

      backgroundColor: "var(--darkgreen)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    });
  };

  return (
    <motion.div
      ref={divRef}
      onTap={(e) => handleCourseTap({ e, subject, status, setStatus, exitAnimate })}
      whileTap={{ scale: 0.8 }}
      // transition={{ delay: 3 }}
      className={clsx("course-box", status)}
      key={course.id}>
      <p>{course.subject}</p>
    </motion.div>
  );
};

export default CourseBox;

//  {
//    willExit && (
//      <motion.div
//        onClick={(e) => e.stopPropagation()}
//        animate={div2Animation}
//        layoutId="maindiv"
//        className={clsx("full-screen-exit", status)}
//      />
//    );
//  }
