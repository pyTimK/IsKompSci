import { Route, Switch, useHistory, useParams, useRouteMatch } from "react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton, makeStyles } from "@material-ui/core";
import { useContext, useEffect, useMemo, useState } from "react";
import CoursesDataContext from "../contexts/CoursesDataContext";
import CourseDescrip2 from "./CourseDescrip2";
import CourseDescrip1 from "./CourseDescrip1";
import { AnimatePresence, motion } from "framer-motion";

const offsetNeeded = 0.45 * document.documentElement.clientHeight;

const CoursePage = ({ hasIntroData }) => {
  const [opacity, setOpacity] = useState(1);
  const [willGoToTips, setWillGoToTips] = useState(false);
  const classes = useStyles(opacity);
  const { id } = useParams();
  const history = useHistory();
  const { path } = useRouteMatch();

  const data = useContext(CoursesDataContext);

  const course = useMemo(() => {
    const courses = data.courses;
    return courses.find((course) => course.subject === decodeURIComponent(id));
  }, [data, id]);

  const showAppbar = opacity === 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    function handleScroll() {
      if (willGoToTips && window.scrollY === 0) {
        setWillGoToTips(false);
        history.push(`${id}/tips`);
      }
      const y = window.scrollY;
      if (y >= offsetNeeded) {
        setOpacity(0);
      } else {
        const newOpacity = (offsetNeeded - y) / offsetNeeded;
        setOpacity(newOpacity);
      }
    }

    window.addEventListener("scroll", handleScroll, false);
    return () => {
      window.removeEventListener("scroll", handleScroll, false);
    };
  }, [willGoToTips, history, id]);

  useEffect(() => {
    if (!hasIntroData) history.push("/intro1");
  }, [hasIntroData, history]);

  const image = useMemo(() => {
    let image;
    try {
      const imgName = course.subject.split(/[^\w\d]/).join("_");
      image = require(`../assets/img/${imgName}.png`).default;
      return image;
    } catch (error) {
      console.log("Error: ", error.message);
      image = require(`../assets/img/CS_12.png`).default;
      return image;
    }
  }, [course]);

  return (
    hasIntroData && (
      <div>
        <div className="course-page-bg">
          <div className={classes.root}>
            <motion.div
              className={classes.backIconWrapper}
              initial={{ x: "-480px" }}
              animate={{ x: "-12px", transition: { delay: 0.1, duration: 1, type: "spring" } }}>
              <IconButton onClick={() => history.goBack()} aria-label="back">
                <ArrowBackIosIcon fontSize="large" className={classes.backIcon} />
              </IconButton>
            </motion.div>
            <div className={classes.spacer}></div>
            <div className={classes.courseImgDiv}>
              <motion.img
                initial={{ opacity: 0, y: "30px" }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 1 } }}
                src={image}
                alt="Related to course"></motion.img>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, duration: 1 } }}
              className={classes.title}>
              <motion.div>
                <h5>{course.subject}</h5>
                <h6>{course.title}</h6>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="course-descrip-bg">
          <AnimatePresence exitBeforeEnter>
            <Switch location={history.location} key={history.location.pathname}>
              <Route path={`${path}/tips`}>
                <CourseDescrip2 course={course} />
              </Route>
              <Route path={`${path}`}>
                <CourseDescrip1 course={course} setWillGoToTips={setWillGoToTips} />
              </Route>
            </Switch>
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {showAppbar && (
            <motion.div
              className={classes.topbar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              {course.subject}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  );
};

const useStyles = makeStyles((theme) => {
  const padding = "16px";
  return {
    root: {
      opacity: (opacity) => opacity,
      padding: padding,
      // paddingTop: (opacity) => `${16 + 50 * (1 - opacity)}px`,
      "& h5": {
        fontWeight: 600,
      },
      "& h6": {
        fontWeight: 200,
        fontSize: "1rem",
      },
    },
    backIconWrapper: {
      float: "left",
    },
    backIcon: {
      margin: "0 !important",
      color: "var(--white)",
    },
    spacer: {
      height: "48px",
    },
    courseImgDiv: {
      // backgroundColor: "blue",
      maxWidth: "80vw",
      margin: "0 auto",
      height: "25vh",
      "& img": {
        display: "block",
        margin: "0 auto",
        maxHeight: "100%",
        maxWidth: "80vw",
        pointerEvens: "none",
      },
    },
    title: {
      backgroundImage: "linear-gradient(transparent 30%, #111)",
      position: "absolute",
      pointerEvents: "none",
      height: "53vh",
      left: 0,
      right: 0,
      paddingLeft: padding,
      paddingRight: padding,
      top: 0,
      "& div": {
        position: "absolute",
        bottom: `calc(${padding} + 8vh)`,
      },
    },
    topbar: {
      position: "fixed",
      width: "100%",
      textAlign: "center",
      top: 0,
      backgroundColor: "var(--materialgreen)",
      zIndex: 4,
      paddingTop: "auto",
      // height: "60px",
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "white",
      // boxShadow: "0px 1px 2px #333",
    },
  };
});

export default CoursePage;
