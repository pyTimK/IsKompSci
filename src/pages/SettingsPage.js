import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const SettingsPage = ({ setShowSettings, setShowHome }) => {
  const classes = useStyles();
  const rootRef = useRef();
  const rootAnimation = useAnimation();

  useEffect(() => {
    rootAnimation
      .start({ x: "0vw", transition: { durdelay: 0.4, duration: 0.2, type: "tween", ease: "linear" } })
      .then(() => setShowHome(false));
  }, []);

  return (
    <motion.div
      ref={rootRef}
      initial={{ x: "100vw" }}
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
          <h6 className={classes.title}>Settings</h6>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarHeight}></div>
      <div>SettingsPage</div>
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      zIndex: 1301,
      position: "fixed",
      width: "100vw",
      height: "100vh",
      backgroundColor: "white",
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
    title: {
      flexGrow: 1,
      color: "white",
    },
    toolbarHeight: {
      height: "var(--toolbarHeight)",
    },
  };
});

export default SettingsPage;
