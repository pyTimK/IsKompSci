import { Button, Container, Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import "../styles/intro.css";

const IntroPage2 = ({ name, setTaken, setTaking, courses }) => {
  let taken = [];
  let taking = [];

  console.log(courses);
  return (
    <div className="wrapper">
      <h4>Hello {name}!</h4>
      <div className="top-align">
        <div className="left">
          <img className="logo full-width" src="/logo.png" />
        </div>
        <div className="right">
          <h5>TELL ME ALL THE COURSES YOU HAVE TAKEN!</h5>
        </div>
      </div>

      <div className="courses-wrapper">
        {courses.map((course) => {
          let takenStatus = "not-taken";
          if (taken.includes(course.subject)) takenStatus = "taken";
          else if (taking.includes(course.subject)) takenStatus = "taking";

          return (
            <motion.div
              onClick={(e) => {
                console.log(e.target.classList);
              }}
              whileTap={{ scale: 0.8 }}
              className={`course-box ${takenStatus}`}
              key={course.id}>
              <p>{course.subject}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="bottom">
        <Button
          component={motion.button}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.9 }}>
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default IntroPage2;
