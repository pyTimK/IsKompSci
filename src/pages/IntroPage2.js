import { Button } from "@material-ui/core";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";
import GroupBySem from "../components/GroupBySem";
import Legend from "../components/Legend";
import "../styles/intro.css";
import TypewriterComponent from "typewriter-effect";

const IntroPage2 = ({ name, setTaken, setTaking, courses }) => {
  const exitAnimation = useAnimation();
  const [taken, pageSetTaken] = useState([]);
  const [taking, pageSetTaking] = useState([]);

  const handleCourseTap = ({ subject, takenStatus }) => {
    if (takenStatus === "not-taken") {
      let newTaken = [...taken, subject];
      pageSetTaken(newTaken);
    } else if (takenStatus === "taken") {
      let newTaken = taken.filter((takenCourse) => takenCourse !== subject);
      pageSetTaken(newTaken);
      let newTaking = [...taking, subject];
      pageSetTaking(newTaking);
    } else {
      let newTaking = taking.filter((takenCourse) => takenCourse !== subject);
      pageSetTaking(newTaking);
    }
  };

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
        {/* <h4>Hello {name}!</h4> */}
        {/* <h4>
          <TypewriterComponent
            onInit={(typewriter) => {
              console.log("hifds");
              typewriter.pauseFor(1000).typeString(`Hello ${name}!`).start();
            }}
            options={{
              delay: 15,
              cursor: "",
            }}
          />
        </h4> */}
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
            <img className="logo" src="/logo.png" />
          </div>
          <div className="intro-right">
            <p>
              <TypewriterComponent
                onInit={(typewriter) => {
                  console.log("hifds");
                  typewriter.pauseFor(2000).typeString("SELECT ALL THE COURSES YOU HAVE TAKEN!").start();
                }}
                options={{
                  delay: 15,
                }}
              />
            </p>
          </div>
        </div>

        <div className="courses-wrapper">
          <Legend />
          <GroupBySem
            tighten={true}
            taken={taken}
            taking={taking}
            courses={courses}
            handleCourseTap={handleCourseTap}
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
