import { Button, makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import CheckIcon from "@material-ui/icons/Check";
import getFromLocalStorage from "../../functions/getFromLocalStorage";
import { Link } from "react-router-dom";

const abbvreviations = { 1: "1st", 2: "2nd", 3: "3rd", 4: "4th", M: "Mid" };
const standingToLvl = {
  "N/A Standing": 0,
  "Freshman Standing": 1,
  "Sophomore Standing": 2,
  "Junior Standing": 3,
  "Senior Standing": 4,
};
const parseList = (s, delimiter = ", ") => {
  let list = s.split(delimiter);
  if (list.length === 1 && list[0] === "") list = [];
  return list;
};

const CourseDescrip1 = ({ course, setWillGoToTips }) => {
  const classes = useStyles();

  const taken = getFromLocalStorage("taken", []);
  const yrLvl = getFromLocalStorage("yrLvl", "N/A");

  const prerequisites = parseList(course.prerequisites);
  const requirements = parseList(course.requirements);

  const textbooks = parseList(course.recommended_textbooks, "\n");
  const websites = parseList(course.recommended_websites, "\n");

  let recommendedSem = abbvreviations[course.offered.charAt(3)];
  let recommendedYear = abbvreviations[course.offered.charAt(0)];

  if (course.subject === "PE") {
    recommendedSem = "1st & 2nd";
    recommendedYear = "1st & 2nd";
  } else if (course.subject === "NSTP") {
    recommendedSem = "1st & 2nd";
    recommendedYear = "2nd";
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={classes.root}>
      <div className={classes.info}>
        <h4>Course Description</h4>
        <p>{course.description}</p>
      </div>
      <div className={classes.info}>
        <h4>When should you take it</h4>
        <p>
          It is recommended to take this course during the{" "}
          <strong className={classes.inline}>{recommendedSem} Semester </strong> of your{" "}
          <strong className={classes.inline}>{recommendedYear} Academic Year</strong>.
        </p>
      </div>
      {(textbooks.length > 0 || websites.length > 0) && (
        <div className={classes.info}>
          <h4>Recommended Materials</h4>
          <div className={classes.recommendation}>
            {textbooks.length > 0 && (
              <div>
                <h5>Textbook{textbooks.length > 1 && "s"}</h5>
                <ul>
                  {textbooks.map((textbook, index) => {
                    return (
                      <li key={index}>
                        <h6>{textbook}</h6>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {websites.length > 0 && (
              <div>
                <h5>Website{websites.length > 1 && "s"}</h5>
                <ul>
                  {websites.map((recommend, index) => {
                    const [recommendTitle, recommendWebsite] = recommend.split(" —- ");
                    return (
                      <li key={index}>
                        <h6>{recommendTitle}</h6>
                        <a className='wrapword' href={recommendWebsite} target='_blank' rel='noopener noreferrer'>
                          {recommendWebsite}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      <hr />
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
                <div className={classes.listCheckboxWrapper}>
                  <Link to={`/course/${encodeURIComponent(prerequisite)}`}>{prerequisite}</Link>
                  &nbsp;
                  <CheckIcon
                    style={{ color: taken.includes(prerequisite) ? "var(--green)" : "transparent" }}
                    fontSize='small'
                  />
                </div>
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
                <div className={classes.listCheckboxWrapper}>
                  <h6>{requirement}</h6>
                  &nbsp;
                  <CheckIcon
                    style={{
                      color:
                        requirement !== "COI (Consent Of Instructor)" &&
                        standingToLvl[yrLvl] >= standingToLvl[requirement]
                          ? "var(--green)"
                          : "transparent",
                    }}
                    fontSize='small'
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <hr />
      <div className={classes.buttonWrapper}>
        <Button
          onTap={(e) => {
            window.scrollTo(0, 0);
            setWillGoToTips(true);
          }}
          className='button-descrip'
          component={motion.button}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.9 }}>
          View Tips
        </Button>
      </div>
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      overflow: "hidden",
      "& h4": {
        fontWeight: 700,
        fontSize: "1.3rem",
        paddingBottom: "4px",
        letterSpacing: 0,
      },
      "& h5": {
        color: "var(--darkergray)",
        fontWeight: 700,
        fontSize: "1rem",
        letterSpacing: 0,
      },
      "& h6": {
        color: "var(--darkergray)",
        fontWeight: 500,
        fontSize: "0.9rem",
        letterSpacing: 0,
      },
      "& a": {
        color: "var(--link)",
        fontWeight: 500,
        fontSize: "0.9rem",
        letterSpacing: 0,
      },
      "& p": {
        color: "var(--darkergray)",
        letterSpacing: 0,
        fontWeight: 400,
        fontSize: "1rem",
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
      paddingTop: "20px",
    },
    listCheckboxWrapper: {
      display: "flex",
      alignItems: "center",
    },
  };
});

export default CourseDescrip1;
