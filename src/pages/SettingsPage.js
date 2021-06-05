import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Slide,
  TextField,
  Toolbar,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { motion, useAnimation } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Ripples from "react-ripples";
import React from "react";
import getFromLocalStorage from "../functions/getFromLocalStorage";
import setFromLocalStorage from "../functions/setFromLocalStorage";
import UserDataContext from "../contexts/UserDataContext";

const SettingsPage = ({ setShowSettings, setShowHome }) => {
  const classes = useStyles();
  const formDialogInputRef = useRef();
  const rootAnimation = useAnimation();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const name = getFromLocalStorage("name", "Ricardo");
  const user = useContext(UserDataContext);
  console.log(user);

  useEffect(() => {
    rootAnimation
      .start({
        x: "0vw",
        transition: { delay: 0.2, duration: 0.1, type: "tween", ease: "linear" },
        transitionEnd: { zIndex: 0 },
      })
      .then(() => setShowHome(false));
  }, [rootAnimation, setShowHome]);

  return (
    <motion.div
      initial={{ x: "100vw", zIndex: 1301 }}
      exit={{ x: "100vw" }}
      animate={rootAnimation}
      className={classes.root}>
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <IconButton
            onClick={() => {
              setShowHome(true);
              setShowSettings(false);
            }}
            edge="start"
            className={classes.menuButton}
            aria-label="back">
            <ArrowBackIosIcon className={classes.backIcon} />
          </IconButton>
          <h6 className={classes.settings}>Settings</h6>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarHeight}></div>
      <SettingsTile onClick={() => setIsFormDialogOpen(true)} title="Change name">
        <div>
          <p>{name}</p>
          <ChevronRightIcon />
        </div>
      </SettingsTile>
      <FormDialog
        open={isFormDialogOpen}
        handleDialogClose={() => setIsFormDialogOpen(false)}
        title="Change name"
        textFieldInitalValue={name}
        textFieldLabel="Name"
        buttons={[
          { text: "CANCEL", onClick: (e, value) => setIsFormDialogOpen(false) },
          {
            text: "UPDATE",
            onClick: (e, value) => {
              if (value === name) return;
              setFromLocalStorage("name", value);
              user.updateProfile({ displayName: value }).catch((error) => {
                console.log("Error loging in: ", error.message);
              });
              setIsFormDialogOpen(false);
            },
          },
        ]}
        formDialogInputRef={formDialogInputRef}
      />
      <SettingsTile title="Reset Graph Positioning" />
    </motion.div>
  );
};

const SettingsTile = ({ title, children, onClick }) => {
  const classes = useStyles();
  return (
    <div>
      <Ripples during={1500} color="rgba(0, 0, 0, .2)">
        <motion.div onClick={onClick} whileTap={{ backgroundColor: "rgba(0,0,0,0.1)" }} className={classes.row}>
          <div className={classes.left}>
            <h6 className={classes.title}>{title}</h6>
          </div>
          <div className={classes.right}>{children}</div>
        </motion.div>
      </Ripples>
      <hr className={classes.hr} />
    </div>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialog = ({
  open,
  handleDialogClose,
  title,
  content,
  buttons,
  formDialogInputRef,
  textFieldInitalValue = "",
  textFieldLabel,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(textFieldInitalValue);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setValue(textFieldInitalValue);
        handleDialogClose();
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle style={{ color: "var(--darkergray)" }} id="alert-dialog-slide-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id={textFieldLabel}
          label={textFieldLabel}
          className={classes.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth
          ref={formDialogInputRef}
        />
      </DialogContent>
      <DialogActions>
        {buttons.map((button, index) => (
          <Button key={index} onClick={(e) => button.onClick(e, value)} color="primary">
            {button.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
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
      "& input": {
        color: "green !important",
      },
      // backgroundColor: "var(--bggray)",
    },
    toolbar: {
      height: "var(--toolbarHeight) !important",
      minHeight: "var(--toolbarHeight) !important",
    },
    menuButton: {
      // marginRight: theme.spacing(2),
      color: "white",
      textAlign: "center",
    },
    settings: {
      flexGrow: 1,
      color: "white",
    },
    toolbarHeight: {
      height: "var(--toolbarHeight)",
    },
    //? Settings Row
    row: {
      position: "relative",
      width: `calc(100vw - 2 * ${rowPadding})`,
      padding: rowPadding,
      color: "black",
    },
    title: {
      fontSize: "1.1rem",
      letterSpacing: "0",
      display: "inline-block",
    },
    left: {
      display: "inline-block",
    },
    right: {
      position: "absolute",
      right: rowPadding,
      top: rowPadding,
      color: "var(--darkgray)",
      display: "inline-block",
      "& div": {
        display: "flex",
        alignItems: "center",
      },
      "& p": {
        display: "inline-block",
        verticalAlign: "middle",
      },
    },
    hr: {
      border: "1px solid rgba(1,1,1,0.2)",
      borderBottom: "none",
      margin: "0",
    },
    //? Form Dialog
    input: {
      color: "blue",
    },
  };
});

export default SettingsPage;
