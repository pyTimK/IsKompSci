import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { motion } from "framer-motion";
import React from "react";
import emailjs, { EmailJSResponseStatus } from "emailjs-com";
import { LocalStorageHelper } from "../../classes/LocalStorageHelper";
import FeedbackTile from "./FeedbackTile";
import { HTMLButtonType } from "../../types/HTMLButtonType";
import notify from "../../functions/notify";
import { useHistory } from "react-router-dom";

const FeedbackPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const name = LocalStorageHelper.get<string>("name", "Ricardo");

  const sendEmail: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
    const userID = process.env.REACT_APP_EMAILJS_USER_ID || "";

    if ([serviceId, templateId, userID].includes("")) {
      console.log("Sending credentials not included");
      history.goBack();
      return;
    }

    emailjs.sendForm(serviceId, templateId, e.target as HTMLFormElement, userID).then(
      (result) => {
        //? Successfully sent message\
        notify("Thank you for your feedback!", { type: "success" });
        console.log("Successfully sent feedback: ");
      },
      (error: EmailJSResponseStatus) => {
        notify("There seems to be an issue sending the feedback");
        console.log("Error sending feedback: status = ", error.status);
      }
    );
    history.goBack();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={classes.root}>
      <form onSubmit={sendEmail}>
        <AppBar position='absolute'>
          <Toolbar className={classes.toolbar}>
            <IconButton
              onClick={() => {
                history.goBack();
              }}
              edge='start'
              className={classes.menuButton}
              aria-label='back'>
              <ArrowBackIosIcon />
            </IconButton>
            <h6 className={classes.pageName}>Feedback</h6>
            <IconButton type={"submit" as HTMLButtonType} edge='end' className={classes.menuButton} aria-label='back'>
              <SendRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbarHeight}></div>

        {/* CHANGE NAME */}
        <div className={classes.inputWrapper}>
          <FeedbackTile title='Name' type='text' initialValue={name} />
          <FeedbackTile title='Email' type='email' />
          <FeedbackTile title='Subject' type='text' />
          <div className={classes.textareaWrapper}>
            <textarea
              required
              name='message'
              placeholder="We'd love to hear your feedback."
              className={classes.textarea}
            />
          </div>
        </div>
      </form>
    </motion.div>
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

    inputWrapper: {
      height: "calc(100vh - var(--toolbarHeight))",
      display: "flex",
      flexDirection: "column",
    },
    textareaWrapper: {
      flexGrow: 1,
      display: "flex",
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
