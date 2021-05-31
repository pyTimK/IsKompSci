import { makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";

import TipsBox from "../components/TipsBox";
const CourseDescrip2 = () => {
  const classes = useStyles();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}
      className={classes.root}>
      <h4>Tips from your fellow students</h4>

      <TipsBox
        message="Honestly you should just drop. This course is pure evil and I'm pretty sure 99% of people who take this course either fail or leave with depression"
        isLikedInitial={true}
        likeCountInitial={19}
      />

      <TipsBox
        message="Wait people actually need advice when taking this course? Lol well I guess I do have an IQ of over 200 so I found the course to be really easy"
        likeCountInitial={-99}
      />
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& h4": {
        fontWeight: 700,
        fontSize: "1.3rem",
        letterSpacing: 0,
      },
    },
  };
});

export default CourseDescrip2;
