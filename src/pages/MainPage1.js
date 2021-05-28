import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useEffect } from "react";
import GroupBySem from "../components/GroupBySem";
import Legend from "../components/Legend";
import updateCourseStatus from "../functions/updateCourseStatus";

const MainPage1 = ({ taken, taking, setTaken, setTaking, editMode, graphElements, groupedBySemCourses }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showCourseDetails = ({}) => {
    //TODO
  };

  const handleCourseTap = ({ subject, takenStatus, graphElements }) => {
    if (editMode) {
      updateCourseStatus({ subject, takenStatus, setTaken, setTaking, graphElements });
    } else {
      showCourseDetails({});
    }
  };
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
        }}>
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
              taken={taken}
              taking={taking}
              groupedBySemCourses={groupedBySemCourses}
              handleCourseTap={({ subject, takenStatus }) => handleCourseTap({ subject, takenStatus, graphElements })}
            />
          </motion.div>
          <Legend />
        </AnimateSharedLayout>
      </motion.div>
    </div>
  );
};

export default MainPage1;
