import { Button, makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { useRef } from "react";

import TipsBox from "../components/TipsBox";
const CourseDescrip2 = () => {
  const classes = useStyles();
  const inputRef = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

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
      <form onSubmit={handleOnSubmit}>
        <textarea
          className={classes.inputBox}
          ref={inputRef}
          rows="5"
          type="text"
          placeholder="Have your own advice?"
          required
        />
        <div className={classes.buttonWrapper}>
          <Button
            className="mybutton2"
            component={motion.button}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}>
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => {
  const inputBoxPadding = 16;
  const borderWidth = 2;
  return {
    root: {
      "& h4": {
        fontWeight: 700,
        fontSize: "1.3rem",
        letterSpacing: 0,
      },
    },
    inputBox: {
      // backgroundColor: "var(--green)",
      border: `${borderWidth}px groove var(--lightgreen)`,
      borderRadius: "0.5rem",
      fontFamily: "Metropolis",
      fontSize: "1rem",
      letterSpacing: 0.3,
      fontWeight: 500,
      width: `calc(100% - 2 * ${borderWidth}px - 2 * ${inputBoxPadding}px)`,
      padding: `${inputBoxPadding}px`,
      transition: "0.3s",
      "&:focus": {
        outline: "none",
        // opacity: "0",

        border: `${borderWidth}px groove var(--orange)`,
      },
      "& h6": {
        fontFamily: "Roboto Mono",
        fontWeight: 500,
        color: "var(--green)",
        display: "inline",
        fontSize: "1.3rem",
        letterSpacing: 0,
      },
      "& p": {
        color: "var(--darkergray)",
        fontWeight: 500,
        fontSize: "1rem",
      },
    },
    buttonWrapper: {
      width: "100%",
      textAlign: "right",
    },
  };
});

export default CourseDescrip2;
