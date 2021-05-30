import { Button } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import GroupBySem from "../components/GroupBySem";
import Legend from "../components/Legend";
import "../styles/intro.css";
import TypewriterComponent from "typewriter-effect";
import { useHistory } from "react-router";
import updateCourseStatus from "../functions/updateCourseStatus";
import getFromLocalStorage from "../functions/getFromLocalStorage";
import { useContext, useEffect } from "react";
import CoursesDataContext from "../contexts/CoursesDataContext";

const IntroPage2 = ({ hasIntroData, setHasIntroData }) => {
  const data = useContext(CoursesDataContext);
  const groupedBySemCourses = data.groupedBySemCourses;
  const graphElements = data.graphElements;
  const history = useHistory();
  const exitAnimation = useAnimation();
  const name = getFromLocalStorage("name", "Ricardo");

  useEffect(() => {
    if (hasIntroData) history.push("/1");
  }, [hasIntroData, history]);

  return (
    <motion.div
      className="intro-bg"
      animate={exitAnimation}
      exit={{
        opacity: 0,
      }}>
      <motion.div
        className="intro-wrapper"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}>
        <motion.h4
          initial={{
            y: "-300%",
          }}
          animate={{
            y: 0,
            transition: { delay: 1 },
          }}>
          Hello {name}!
        </motion.h4>
        <div className="top-align">
          <div className="intro-left">
            <img className="logo" src="/logo.png" alt="app logo" />
          </div>
          <div className="intro-right">
            {/* <p> */}
            <TypewriterComponent
              onInit={(typewriter) => {
                typewriter.pauseFor(2000).typeString("SELECT ALL THE COURSES YOU HAVE TAKEN!").start();
              }}
              options={{
                delay: 15,
                cursor: "",
              }}
            />
            {/* </p> */}
          </div>
        </div>

        <div className="courses-wrapper">
          <Legend />
          <GroupBySem
            tighten={true}
            groupedBySemCourses={groupedBySemCourses}
            handleCourseTap={({ subject, setStatus }) =>
              updateCourseStatus({
                subject,
                graphElements,
                setStatus,
              })
            }
          />
        </div>

        <div className="bottom">
          <Button
            onTap={async (e) => {
              await exitAnimation.start({ opacity: 0, transition: { delay: 0.3 } });
              setHasIntroData(true);
            }}
            className="mybutton"
            component={motion.button}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}>
            NEXT
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IntroPage2;
