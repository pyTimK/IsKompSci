import { useHistory, useParams } from "react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import CoursesDataContext from "../contexts/CoursesDataContext";

const CoursePage = ({ hasIntroData }) => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  const data = useContext(CoursesDataContext);
  const courses = data.courses;
  const course = courses.find((course) => course.subject === id);
  console.log(course);

  if (!hasIntroData) {
    history.push("/intro1");
  }

  //TODO CHANGE IMAGE TO BE
  let image;
  try {
    const imgName = id.split(" ").join("_");
    console.log(imgName);
    image = require(`../assets/img/${imgName}.png`).default;
  } catch (error) {
    console.log("Error: ", error.message);
    image = require(`../assets/img/CS_12.png`).default;
  }

  return (
    <div className="course-descrip-bg">
      {hasIntroData && (
        <div>
          <IconButton onClick={() => history.goBack()} className={classes.backButton} aria-label="menu">
            <ArrowBackIosIcon fontSize="large" color="secondary" />
          </IconButton>
          <div className={classes.spacer}></div>
          <div className={classes.courseImgDiv}>
            <img src={image} alt="Related to course"></img>
          </div>

          <div>{id}</div>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    backButton: {
      position: "absolute",
      marginLeft: "8px",
      marginTop: "8px",
    },
    spacer: {
      height: "48px",
    },
    courseImgDiv: {
      backgroundImage: "blue",
      width: "80%",
      margin: "0 auto",
      // paddingTop: "58.33%" /* 16:9 Aspect Ratio (height / width = 0.5625) */,
      "& img": {
        width: "100%",
      },
    },
  };
});

export default CoursePage;
