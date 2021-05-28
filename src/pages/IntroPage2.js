import { Button } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import GroupBySem from "../components/GroupBySem";
import Legend from "../components/Legend";
import "../styles/intro.css";
import TypewriterComponent from "typewriter-effect";
import { useHistory } from "react-router";
import updateCourseStatus from "../functions/updateCourseStatus";

const IntroPage2 = ({ name, hasIntroData, setTaken, setTaking, graphElements, groupedBySemCourses }) => {
  const history = useHistory();
  const exitAnimation = useAnimation();
  const [taken, pageSetTaken] = useState([]);
  const [taking, pageSetTaking] = useState([]);

  useEffect(() => {
    if (hasIntroData) {
      history.push("/");
    }
  }, [hasIntroData]);

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
                console.log("hifds");
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
            taken={taken}
            taking={taking}
            groupedBySemCourses={groupedBySemCourses}
            handleCourseTap={({ subject, takenStatus }) =>
              updateCourseStatus({
                subject,
                takenStatus,
                setTaken: pageSetTaken,
                setTaking: pageSetTaking,
                graphElements,
              })
            }
          />
        </div>

        <div className="bottom">
          <Button
            onTap={async (e) => {
              await exitAnimation.start({ opacity: 0, transition: { delay: 0.3 } });
              setTaking(taking);
              setTaken(taken);
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
