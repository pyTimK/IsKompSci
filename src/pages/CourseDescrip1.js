import { Button, makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
const abbvreviations = { 1: "1st", 2: "2nd", 3: "2nd", 4: "2nd", M: "Mid" };
const CourseDescrip1 = ({ course }) => {
  const classes = useStyles();
  console.log("CourseDescrip1 rendered");
  let prerequisites = course.prerequisites.split(", ");
  if (prerequisites.length === 1 && prerequisites[0] === "") prerequisites = [];

  let requirements = course.requirements.split(", ");
  if (requirements.length === 1 && requirements[0] === "") requirements = [];

  return (
    // <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="course-descrip-bg">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="course-descrip-bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6 } }}
        className={classes.root}>
        <div className={classes.info}>
          <h4>Course Description</h4>
          <p>{course.description}</p>
        </div>
        <div className={classes.info}>
          <h4>When should you take it</h4>
          <p>
            It is recommended to take this course during the{" "}
            <strong className={classes.inline}>{abbvreviations[course.offered.charAt(3)]} Semester </strong> of your{" "}
            <strong className={classes.inline}>{abbvreviations[course.offered.charAt(0)]} Academic Year</strong>
          </p>
        </div>
        <div className={classes.info}>
          <h4>Recommended Materials</h4>
          <div className={classes.recommendation}>
            <h5>Textbooks</h5>
            <ul>
              {course.recommended_textbooks.split("\n").map((recommend, index) => {
                return (
                  <li key={index}>
                    <h6>{recommend}</h6>
                  </li>
                );
              })}
            </ul>
            <h5>Websites</h5>
            <ul>
              {course.recommended_websites.split("\n").map((recommend, index) => {
                return (
                  <li key={index}>
                    <a className="wrapword" href={recommend} target="_blank" rel="noopener noreferrer">
                      {recommend}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={classes.infoShort}>
          <h4>Unit{course.units > 1 && "s"}: </h4>
          <p>{course.units}</p>
        </div>
        <div className={classes.infoShort}>
          <h4>Prerequisite{prerequisites.length > 1 && "s"}: </h4>
          {prerequisites.length === 0 && <p>None</p>}
          <ul className={classes.noBottomMargin}>
            {prerequisites.map((prerequisite, index) => {
              return (
                <li key={index}>
                  <a href={prerequisite}>{prerequisite}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes.infoShort}>
          <h4>Other Requirements{requirements.length > 1 && "s"}: </h4>
          {requirements.length === 0 && <p>None</p>}
          <ul className={classes.noBottomMargin}>
            {requirements.map((requirement, index) => {
              return (
                <li key={index}>
                  <h6>{requirement}</h6>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            className="mybutton2"
            component={motion.button}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}>
            Feedback Page
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    //
    root: {
      overflow: "hidden",
      "& h4": {
        fontWeight: 700,
        fontSize: "1.2rem",
        paddingBottom: "4px",
        letterSpacing: 0,
      },
      "& h5": {
        color: "var(--green)",
        fontWeight: 700,
        fontSize: "0.9rem",
        letterSpacing: 0,
      },
      "& h6": {
        color: "var(--darkergreen)",
        fontWeight: 500,
        fontSize: "0.8rem",
        letterSpacing: 0,
      },
      "& a": {
        color: "var(--link)",
        fontWeight: 500,
        fontSize: "0.8rem",
        letterSpacing: 0,
      },
      "& p": {
        color: "var(--darkergreen)",
        letterSpacing: 0,
        fontWeight: 400,
        fontSize: "0.9rem",
      },
      "& ul": {
        marginTop: "0",
      },
    },
    noBottomMargin: {
      marginBottom: "0",
    },
    info: {
      paddingBottom: "48px",
    },
    infoShort: {
      paddingBottom: "6px",
      "& h4": {
        display: "inline",
      },
      "& p": {
        display: "inline",
        fontWeight: 400,
        fontSize: "1.1rem",
      },
    },
    inline: {
      display: "inline-block",
    },
    buttonWrapper: {
      textAlign: "center",
    },
  };
});

export default CourseDescrip1;
