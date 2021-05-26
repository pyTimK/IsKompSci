import {
  AppBar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import useToggle from "../hooks/useToggle";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import React from "react";
import { green } from "@material-ui/core/colors";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import EmailIcon from "@material-ui/icons/Email";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import clsx from "clsx";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";

const Layout = ({ name, willShow, children, editMode, toggleEditMode }) => {
  const classes = useStyles();
  const [drawer, toggleDrawer] = useToggle(false);
  const drawerItems = [
    ["Settings", <SettingsOutlinedIcon />],
    ["Feedback", <MailOutlineIcon />],
  ];

  return (
    <div className="layout-wrapper">
      {willShow && (
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
            </AppBar>
            <div className={classes.toolbarHeight}></div>
          </motion.div>
        </div>
      )}

      {children}
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
    toolbarHeight: theme.mixins.toolbar,
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
