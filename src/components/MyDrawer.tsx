import { SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import YouTubeIcon from "@material-ui/icons/YouTube";
import openInNewTab from "../functions/openInNewTab";
import { LocalStorageHelper } from "../classes/LocalStorageHelper";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { CrossFadeTransitionContext, PositionDimension } from "./CrossFadeTransition";

interface Props {
  open: boolean;
  toggleOpen: () => void;
}

const MyDrawer: React.FC<Props> = ({ open, toggleOpen }) => {
  const classes = useStyles();
  const history = useHistory();
  const crossFadeTransition = useContext(CrossFadeTransitionContext);
  const name = LocalStorageHelper.get<string>("name", "Ricardough");

  const drawerItems = [
    {
      label: "Settings",
      icon: <SettingsOutlinedIcon />,
      onClick: () => {
        crossFadeTransition
          ?.exitAnimate({
            initialColor: "var(--white)",
            finalColor: "#fff",
            initialPosition: crossFadeInitialPosition(),
          })
          .then(() => history.push("/settings"));
      },
    },
    { label: "Tutorial", icon: <YouTubeIcon />, onClick: () => openInNewTab("https://youtu.be/YFtIBPbMKko") },
    {
      label: "Feedback",
      icon: <MailOutlineIcon />,
      onClick: () => {
        crossFadeTransition
          ?.exitAnimate({
            initialColor: "var(--white)",
            finalColor: "#fff",
            initialPosition: crossFadeInitialPosition(),
          })
          .then(() => history.push("/feedback"));
      },
    },
  ];

  return (
    <SwipeableDrawer open={open} onClose={toggleOpen} onOpen={toggleOpen}>
      <div className={classes.drawer} role='presentation' onClick={toggleOpen} onKeyDown={toggleOpen}>
        <div className={classes.logo}>
          <img className='logo' src='/logo.png' alt='app logo' />
        </div>
        <p>Hello!</p>
        <h5>{name}</h5>
        <Divider />
        <List>
          {drawerItems.map((item) => (
            <ListItem button key={item.label} onClick={item.onClick}>
              <ListItemIcon className={classes.drawerIcons}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <h5 className={classes.iskompsci}>IsKompSci</h5>
      </div>
    </SwipeableDrawer>
  );
};

const crossFadeInitialPosition = (): PositionDimension => {
  const percentWidth = 0.6;
  const percentHeight = 0.8;
  return {
    x: (window.screen.width * (1 - percentWidth)) / 2,
    y: (document.documentElement.clientHeight * (1 - percentHeight)) / 2,
    width: window.screen.width * percentWidth,
    height: document.documentElement.clientHeight * percentHeight,
  };
};

const useStyles = makeStyles((theme) => {
  const drawerPadding = "16px";
  return {
    drawer: {
      width: 250,
      backgroundColor: "white",
      height: "100%",
      padding: drawerPadding,
      fontWeight: 300,
      textAlign: "center",
      color: "var(--darkgray)",
    },
    drawerIcons: {
      minWidth: "42px",
    },
    logo: {
      textAlign: "center",
      height: "6rem",
    },
    iskompsci: {
      position: "absolute",
      bottom: "16px",
      width: `calc(100% - 2 * ${drawerPadding})`,
      opacity: 0.7,
    },
  };
});

export default MyDrawer;
