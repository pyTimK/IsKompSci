import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

const Layout = ({ willShow, children, editMode, toggleEditMode }) => {
  const classes = useStyles();

  return (
    <div className="layout-wrapper">
      {willShow && (
        <div>
          <AppBar>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <h6 className={classes.title}>Course Outline</h6>
              <IconButton
                onClick={() => {
                  toggleEditMode();
                  document.body.scrollTop = 0; // For Safari
                  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                }}
                edge="end"
                className={classes.editButton}
                aria-label="edit">
                {editMode ? <DoneOutlinedIcon /> : <EditOutlinedIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.toolbarHeight}></div>
        </div>
      )}

      {children}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
  editButton: {
    color: "white",
  },
  toolbarHeight: theme.mixins.toolbar,
}));

export default Layout;
