import { motion } from "framer-motion";
import { useState } from "react";

const CourseBox = ({ course, handleCourseTap, subject, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);
  // console.log("Course Box ", subject, " renders ", status);
  return (
    <motion.div
      onTap={(e) => handleCourseTap({ e, subject, status, setStatus })}
      whileTap={{ scale: 0.8 }}
      className={`course-box ${status}`}
      key={course.id}>
      <p>{course.subject}</p>
    </motion.div>
  );
};

export default CourseBox;
