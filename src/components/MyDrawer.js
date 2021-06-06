import { SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import getFromLocalStorage from "../functions/getFromLocalStorage";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const MyDrawer = ({ drawer, toggleDrawer, setShowSettings, setShowFeedback }) => {
  const classes = useStyles();
  const name = getFromLocalStorage("name", "Ricardough");

  const drawerItems = [
    { label: "Settings", icon: <SettingsOutlinedIcon />, onClick: (e) => setShowSettings(true) },
    {
      label: "Feedback",
      icon: <MailOutlineIcon />,
      onClick: (e) => setShowFeedback(true),
    },
  ];

  return (
    <SwipeableDrawer open={drawer} onClose={toggleDrawer} onOpen={toggleDrawer}>
      <div className={classes.drawer} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
        <div className={classes.logo}>
          <img className="logo" src="/logo.png" alt="app logo" />
        </div>
        <p>Hello!</p>
        <h5>{name}</h5>
        <Divider className={classes.drawerDivider} />
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
    logo: {
      textAlign: "center",
      height: "6rem",
    },
    iskompsci: {
      position: "absolute",
      bottom: "16px",
      width: `calc(100% - 2 * ${drawerPadding})`,
      opacity: 0.7,

      // width: `calc(100% - 2 * ${drawerPadding})`,
    },
  };
});

export default MyDrawer;
