import { SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import YouTubeIcon from "@material-ui/icons/YouTube";
import openInNewTab from "../functions/openInNewTab";
import { LocalStorageHelper } from "../classes/LocalStorageHelper";
import { useContext } from "react";
import { DrawerPageContext } from "../Home";

interface Props {
  open: boolean;
  toggleOpen: () => void;
}

const MyDrawer: React.FC<Props> = ({ open, toggleOpen }) => {
  const classes = useStyles();
  const name = LocalStorageHelper.get<string>("name", "Ricardough");
  const drawerPage = useContext(DrawerPageContext)!;

  const drawerItems = [
    { label: "Settings", icon: <SettingsOutlinedIcon />, onClick: () => drawerPage.setShowSettings(true) },
    {
      label: "Tutorial",
      icon: <YouTubeIcon />,
      onClick: () => openInNewTab("https://youtu.be/YFtIBPbMKko"),
    },
    {
      label: "Feedback",
      icon: <MailOutlineIcon />,
      onClick: () => drawerPage.setShowFeedback(true),
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
