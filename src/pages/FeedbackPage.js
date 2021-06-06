import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import React from "react";
import getFromLocalStorage from "../functions/getFromLocalStorage";
import emailjs from "emailjs-com";

const FeedbackPage = ({ setShowFeedback, setShowHome }) => {
  const classes = useStyles();
  const rootAnimation = useAnimation();
  const name = getFromLocalStorage("name", "Ricardo");

  const close = useCallback(() => {
    setShowHome(true);
    setShowFeedback(false);
  }, [setShowHome, setShowFeedback]);

  useEffect(() => {
    rootAnimation
      .start({
        x: "0vw",
        transition: { delay: 0.2, duration: 0.1, type: "tween", ease: "linear" },
        transitionEnd: { zIndex: 0 },
      })
      .then(() => setShowHome(false));
  }, [rootAnimation, setShowHome]);

  function sendEmail(e) {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
    const userId = process.env.REACT_APP_EMAILJS_USER_ID || "";

    if ([serviceId, templateId, userId].includes("")) {
      console.log("Sending credentials not included");
      close();
      return;
    }

    emailjs.sendForm(serviceId, templateId, e.target, userId).then(
      (result) => {
        //? Successfully sent message
      },
      (error) => {
        console.log("Error sending feedback: ", error.text);
      }
    );
    close();
  }

  return (
    <motion.div
      initial={{ x: "100vw", zIndex: 1301 }}
      exit={{ x: "100vw" }}
      animate={rootAnimation}
      className={classes.root}>
      <form onSubmit={sendEmail}>
        <AppBar position="absolute">
          <Toolbar className={classes.toolbar}>
            <IconButton
              onClick={() => {
                close();
              }}
              edge="start"
              className={classes.menuButton}
              aria-label="back">
              <ArrowBackIosIcon />
            </IconButton>
            <h6 className={classes.pageName}>Feedback</h6>
            <IconButton type="submit" edge="end" className={classes.menuButton} aria-label="back">
              <SendRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbarHeight}></div>
        {/* CHANGE NAME */}
        <div className={classes.inputWrapper}>
          <FeedbackTile title="Name" type="text" initialValue={name} />
          <FeedbackTile title="Email" type="email" />
          <FeedbackTile title="Subject" type="text" />
          <div className={classes.textareaWrapper}>
            <textarea
              required
              name="message"
              placeholder="We'd love to hear your feedback."
              className={classes.textarea}
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
};

const FeedbackTile = ({ title, type, initialValue }) => {
  const classes = useStyles();
  const inputRef = useRef();
  return (
    <div>
      <motion.div
        onClick={() => inputRef.current.focus()}
        whileTap={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        className={classes.row}>
        <div className={classes.left}>
          <h6 className={classes.title}>{title}:</h6> &nbsp;
          <input
            className={classes.myInput}
            ref={inputRef}
            type={type}
            name={title.toLowerCase()}
            defaultValue={initialValue}
            required
          />
        </div>
      </motion.div>
      <hr className={classes.hr} />
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  const rowPadding = "16px";
  return {
    root: {
      position: "fixed",
      width: "100vw",
      height: "100vh",
      backgroundColor: "white",
    },
    toolbar: {
      height: "var(--toolbarHeight) !important",
      minHeight: "var(--toolbarHeight) !important",
    },
    menuButton: {
      color: "white",
      textAlign: "center",
    },
    pageName: {
      flexGrow: 1,
      color: "white",
    },
    toolbarHeight: {
      height: "var(--toolbarHeight)",
    },
    //? Input Row
    row: {
      position: "relative",
      width: `calc(100vw - 2 * ${rowPadding})`,
      padding: rowPadding,
      color: "black",
    },
    title: {
      fontSize: "1.1rem",
      letterSpacing: "0",
      color: "var(--darkgray)",
      display: "inline-block",
    },

    hr: {
      border: "1px solid rgba(1,1,1,0.2)",
      borderBottom: "none",
      margin: "0",
    },
    inputWrapper: {
      height: "calc(100vh - var(--toolbarHeight))",
      display: "flex",
      flexDirection: "column",
    },
    left: {
      display: "flex",
    },
    myInput: {
      fontFamily: "Metropolis",
      fontSize: "1.1rem",
      color: "black",
      border: "none",
      flexGrow: 1,
      backgroundColor: "transparent",
      "&:focus": {
        outline: "none",
      },
    },
    textareaWrapper: {
      flexGrow: 1,
      display: "flex",
      // height,
    },
    textarea: {
      fontFamily: "Metropolis",
      fontSize: "1.1rem",
      color: "black",
      backgroundColor: "transparent",
      border: "none",
      flexGrow: 1,
      padding: rowPadding,
      "&:focus": {
        outline: "none",
      },
    },
  };
});

export default FeedbackPage;
