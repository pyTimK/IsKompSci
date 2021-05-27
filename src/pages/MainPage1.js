import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useHistory } from "react-router";
import GroupBySem from "../components/GroupBySem";
import Legend from "../components/Legend";

const MainPage1 = ({ taken, taking, setTaken, setTaking, courses, editMode }) => {
  const updateCourseStatus = ({ subject, takenStatus }) => {
    if (takenStatus === "not-taken") {
      let newTaken = [...taken, subject];
      setTaken(newTaken);
    } else if (takenStatus === "taken") {
      let newTaken = taken.filter((takenCourse) => takenCourse !== subject);
      setTaken(newTaken);
      let newTaking = [...taking, subject];
      setTaking(newTaking);
    } else {
      let newTaking = taking.filter((takenCourse) => takenCourse !== subject);
      setTaking(newTaking);
    }
  };

  const showCourseDetails = ({}) => {
    //
  };

  const handleCourseTap = ({ e, course, subject, takenStatus }) => {
    if (editMode) {
      updateCourseStatus({ subject, takenStatus });
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
            <GroupBySem taken={taken} taking={taking} courses={courses} handleCourseTap={handleCourseTap} />
          </motion.div>
          <Legend />
        </AnimateSharedLayout>
      </motion.div>
    </div>
  );
};

export default MainPage1;
