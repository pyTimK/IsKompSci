import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import useToggle from "../../hooks/useToggle";
import React, { useEffect, useState } from "react";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import { useHistory } from "react-router";
import { ReactFlowProvider } from "react-flow-renderer";
import MyDrawer from "../../components/MyDrawer";
import { AppBar, IconButton, Tab, Tabs, Toolbar, makeStyles } from "@material-ui/core";
import { LocalStorageHelper } from "../../classes/LocalStorageHelper";
import scrollTop from "../../functions/scrollTop";
import { useContext } from "react";
import SearchBar from "../../components/SearchBar";
import CardsView from "./CardsView";
import GraphView from "./GraphView";
import { HasIntroDataContext } from "../../RoutesWrapper";

export const EditModeContext = React.createContext<boolean>(false);
const EditModeProvider = EditModeContext.Provider;

const Home: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const [open, toggleOpen] = useToggle(false);
  const initialTab = LocalStorageHelper.get<0 | 1>("tabIndex", 0);
  const [tab, setTab] = useState(initialTab);
  const [editMode, toggleEditMode] = useToggle();
  const hasIntroData = useContext(HasIntroDataContext);

  useEffect(() => {
    LocalStorageHelper.set("tabIndex", tab);
  }, [tab]);

  if (!hasIntroData) {
    history.push("/intro/1");
  }

  const handleChange = (_: React.ChangeEvent<{}>, newTab: any) => {
    if (newTab !== tab) {
      if (editMode) toggleEditMode();
      setTab(newTab);
    }
  };

  const views: JSX.Element[] = [<CardsView />, <GraphView />];

  return (
    <div className={classes.root}>
      {hasIntroData && (
        <div className='home-page-vars'>
          <MyDrawer open={open} toggleOpen={toggleOpen} />
          <AppBar position='absolute'>
            <Toolbar className={classes.toolbar}>
              <IconButton
                onClick={() => {
                  if (editMode) toggleEditMode();
                  toggleOpen();
                }}
                edge='start'
                className={classes.menuButton}
                aria-label='menu'>
                <UseAnimations className={classes.avoidClicks} strokeColor='white' animation={menu4} size={36} />
              </IconButton>
              {/* <h6 className={classes.title}>Course Outline</h6> */}
              <div className={classes.grow} />
              <SearchBar />

              <IconButton
                onClick={() => {
                  toggleEditMode();
                  scrollTop();
                }}
                edge='end'
                className={classes.white}
                aria-label='edit'>
                {editMode ? <DoneOutlinedIcon /> : <EditOutlinedIcon />}
              </IconButton>
            </Toolbar>
            <Tabs className={classes.tabs} value={tab} onChange={handleChange} variant='fullWidth'>
              <Tab className={classes.tabLabel} label='Cards' />
              <Tab className={classes.tabLabel} label='Graph' />
            </Tabs>
          </AppBar>
          <div className={classes.toolbarHeight}></div>
          <ReactFlowProvider>
            <div className={classes.content}>
              <EditModeProvider value={editMode}>{views[tab]}</EditModeProvider>
            </div>
          </ReactFlowProvider>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      color: "white",
      backgroundColor: "var(--bggray)",
    },
    grow: {
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
      fontWeight: 400,
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

    content: {
      paddingTop: "calc(var(--tabsHeight))",
    },
  };
});

export default Home;
