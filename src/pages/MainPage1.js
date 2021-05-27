import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import GroupBySem from "../components/GroupBySem";
import Legend from "../components/Legend";
import useLocalStorage from "../hooks/useLocalStorage";

const MainPage1 = ({ taken, taking, setTaken, setTaking, courses, editMode }) => {
  // const [offset, setOffset] = useLocalStorage(0);
  // const [mainPage1offset, setMainPage1Offset] = useLocalStorage("mainPage1offset", 0);
  // // let isMounted = useRef(true);

  // useEffect(() => {
  //   const updateOffset = () => {
  //     setOffset(window.pageYOffset);
  //   };
  //   window.onscroll = window.addEventListener("scroll", updateOffset, false);
  //   return () => {
  //     console.log("offset: ", offset);
  //     setMainPage1Offset(offset);
  //     window.removeEventListener("scroll", updateOffset, false);
  //   };
  // }, []);

  // console.log(offset);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
