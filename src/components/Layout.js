import { AppBar, IconButton, makeStyles, Tab, Tabs, Toolbar } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { motion, useAnimation } from "framer-motion";
import useToggle from "../hooks/useToggle";
import React, { useEffect } from "react";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import { useHistory, useLocation, useParams } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";
import { ReactFlowProvider } from "react-flow-renderer";
import MyDrawer from "./MyDrawer";

const Layout = ({ hasIntroData, children, editMode, toggleEditMode, setShowSettings, setShowFeedback }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [drawer, toggleDrawer] = useToggle(false);
  const [tab, setTab] = useLocalStorage("tabIndex", 0);
  const appbarAnimation = useAnimation();

  const { animate } = useParams();
  //* animate!=1 means we dont need to reanimate, e.g., using back

  useEffect(() => {
    if (animate === "1") {
      appbarAnimation.set({ y: "-100%" });
      appbarAnimation.start({ y: 0 }).then(() => history.push("/"));
    }
  }, [animate, appbarAnimation, history]);

  if (!hasIntroData) {
    history.push("/intro1");
  }

  if (location.pathname === "/main2" && tab !== 1) {
    setTab(1);
  } else if (location.pathname !== "/main2" && tab !== 0) {
    setTab(0);
  }

  const handleChange = (e, newTab) => {
    if (newTab !== tab) {
      if (editMode) toggleEditMode();
      setTab(newTab);
      history.push(newTab === 0 ? "/" : "/main2");
    }
  };

  return (
    <div className="layout-wrapper">
      {hasIntroData && (
        <div>
          <MyDrawer
            drawer={drawer}
            toggleDrawer={toggleDrawer}
            setShowSettings={setShowSettings}
            setShowFeedback={setShowFeedback}
          />
          <motion.div animate={appbarAnimation}>
            <AppBar position="absolute">
              <Toolbar className={classes.toolbar}>
                <IconButton
                  onClick={(e) => {
                    if (editMode) toggleEditMode();
                    toggleDrawer();
                  }}
                  edge="start"
                  className={classes.menuButton}
                  aria-label="menu">
                  <UseAnimations className={classes.avoidClicks} strokeColor="white" animation={menu4} size={36} />
                </IconButton>
                <h6 className={classes.title}>Course Outline</h6>
                <IconButton
                  onClick={() => {
                    toggleEditMode();
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                  }}
                  edge="end"
                  className={classes.white}
                  aria-label="edit">
                  {editMode ? <DoneOutlinedIcon /> : <EditOutlinedIcon />}
                </IconButton>
              </Toolbar>
              <Tabs className={classes.tabs} value={tab} onChange={handleChange} variant="fullWidth">
                <Tab className={classes.tabLabel} label="Cards" />
                <Tab className={classes.tabLabel} label="Graph" />
              </Tabs>
            </AppBar>
            <div className={classes.toolbarHeight}></div>
          </motion.div>
          <ReactFlowProvider>{children}</ReactFlowProvider>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    toolbar: {
      height: "var(--toolbarHeight) !important",
      minHeight: "var(--toolbarHeight) !important",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "white",
      textAlign: "center",
    },
    title: {
      flexGrow: 1,
      color: "white",
    },
    white: {
      color: "white",
    },
    tabLabel: {
      fontWeight: "400",
      fontSize: "0.8rem",
      color: "white",
      letterSpacing: "0.05rem",
    },
    toolbarHeight: {
      height: "var(--toolbarHeight)",
    },

    drawerDivider: {
      margin: "12px 0",
    },
    avoidClicks: {
      pointerEvents: "none",
    },

    tabs: {
      height: "var(--tabsHeight) !important",
    },
  };
});

export default Layout;
