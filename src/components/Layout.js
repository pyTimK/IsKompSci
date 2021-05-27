import {
  AppBar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Tab,
  Tabs,
  Toolbar,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { motion } from "framer-motion";
import useToggle from "../hooks/useToggle";
import React, { useEffect, useState } from "react";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import clsx from "clsx";
import { useHistory } from "react-router";

const Layout = ({ name, hasIntroData, children, editMode, toggleEditMode }) => {
  const history = useHistory();
  const classes = useStyles();
  const [drawer, toggleDrawer] = useToggle(false);
  const [tab, setTab] = useState(0);

  if (!hasIntroData) {
    history.push("/intro1");
  }

  const drawerItems = [
    ["Settings", <SettingsOutlinedIcon />],
    ["Feedback", <MailOutlineIcon />],
  ];

  const handleChange = (event, newTab) => {
    if (newTab !== tab) {
      history.push(newTab === 0 ? "/" : "/main2");
    }
    setTab(newTab);
  };

  return (
    <div className="layout-wrapper">
      {hasIntroData && (
        <div>
          <SwipeableDrawer open={drawer} onClose={toggleDrawer} onOpen={toggleDrawer}>
            <div className={classes.drawer} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
              <div className={classes.logo}>
                <img className="logo" src="/logo.png" />
              </div>
              <p>Hello!</p>
              <h5>{name}</h5>
              <Divider className={classes.drawerDivider} />
              <List>
                {drawerItems.map((item) => (
                  <ListItem button key={item[0]}>
                    <ListItemIcon className={classes.drawerIcons}>{item[1]}</ListItemIcon>
                    <ListItemText primary={item[0]} />
                  </ListItem>
                ))}
              </List>
              <h5 className={classes.iskompsci}>IsKompSci</h5>
            </div>
          </SwipeableDrawer>
          <motion.div
            initial={{
              y: "-100%",
            }}
            animate={{
              y: 0,
            }}>
            <AppBar>
              <Toolbar>
                <IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} aria-label="menu">
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
              <Tabs value={tab} onChange={handleChange} variant="fullWidth">
                <Tab className={classes.tabLabel} label="Cards" />
                <Tab className={classes.tabLabel} label="Graph" />
              </Tabs>
            </AppBar>
            <div className={clsx(classes.toolbarHeight, classes.marginBottom)}></div>
          </motion.div>
          {children}
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  const drawerPadding = "16px";
  return {
    root: {
      flexGrow: 1,
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
    toolbarHeight: theme.mixins.toolbar,
    marginBottom: {
      // marginBottom: "48px",
    },
    drawer: {
      width: 250,
      backgroundColor: "white",
      // backgroundColor: green[600],
      height: "100%",
      padding: drawerPadding,
      fontWeight: "300",
      textAlign: "center",
      color: "var(--darkgray)",
    },
    drawerIcons: {
      minWidth: "42px",
    },
    drawerDivider: {
      margin: "12px 0",
    },
    avoidClicks: {
      pointerEvents: "none",
    },
    iskompsci: {
      position: "absolute",
      bottom: "16px",
      width: `calc(100% - 2 * ${drawerPadding})`,
      opacity: 0.7,

      // width: `calc(100% - 2 * ${drawerPadding})`,
    },
    logo: {
      textAlign: "center",
      height: "6rem",
    },
  };
});

export default Layout;
