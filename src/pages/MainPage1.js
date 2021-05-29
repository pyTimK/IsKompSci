import { AnimatePresence, AnimateSharedLayout, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import GroupBySem from "../components/GroupBySem";
import Legend from "../components/Legend";
import updateCourseStatus from "../functions/updateCourseStatus";

const MainPage1 = ({ editMode, graphElements, groupedBySemCourses }) => {
  const divAnimation = useAnimation();
  useEffect(() => {
    divAnimation.start({ opacity: 1 });
    window.scrollTo(0, 0);
  }, [divAnimation]);

  const showCourseDetails = ({}) => {
    //TODO
  };

  const handleCourseTap = ({ subject, setStatus }) => {
    if (editMode) {
      updateCourseStatus({ subject, graphElements, setStatus });
    } else {
      showCourseDetails({});
    }
  };
  return (
    <div className="main-bg">
      <motion.div className="main-wrapper" initial={{ opacity: 0 }} animate={divAnimation}>
        <AnimateSharedLayout>
          <AnimatePresence>
            {editMode && (
              <motion.div
                layout
                className="main-center"
                initial={{
                  opacity: 0.6,
                  // y: "-100%",
                  scaleY: 0,
                }}
                animate={{
                  opacity: 1,
                  // y: "0",
                  scaleY: 1,
                  transition: {
                    // duration: 3,
                  },
                }}
                exit={{
                  opacity: 0,
                  // y: "-100%",
                  transition: { duration: 0.2 },
                }}>
                <h6>Edit Mode</h6>
                <p>TAP TO CHANGE COURSE STATUS</p>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div layout>
            <GroupBySem
              groupedBySemCourses={groupedBySemCourses}
              handleCourseTap={({ subject, setStatus }) => handleCourseTap({ subject, setStatus })}
            />
          </motion.div>
          <Legend />
        </AnimateSharedLayout>
      </motion.div>
    </div>
  );
};

export default MainPage1;
