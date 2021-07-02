import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { motion, useAnimation } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React from "react";
import { LocalStorageHelper } from "../../classes/LocalStorageHelper";
import { DataContext } from "../../App";
import SettingsTile from "./SettingsTile";
import FormDialog from "../../components/FormDialog";
import { DrawerPageContext } from "../Home";

const SettingsPage: React.FC = () => {
  const classes = useStyles();
  const rootAnimation = useAnimation();
  const [openChangeNameDialog, setOpenChangeNameDialog] = useState(false);
  const [openResetGraphDialog, setOpenResetGraphDialog] = useState(false);
  const [openClearDataDialog, setOpenClearDataDialog] = useState(false);
  const name = LocalStorageHelper.get<string>("name", "Ricardo");
  const data = useContext(DataContext);
  const drawerPage = useContext(DrawerPageContext)!;

  useEffect(() => {
    rootAnimation
      .start({
        x: "0vw",
        transition: { delay: 0.2, duration: 0.1, type: "tween", ease: "linear" },
        transitionEnd: { zIndex: 0 },
      })
      .then(() => drawerPage.setShowHome(false));
  }, [rootAnimation, drawerPage]);

  return (
    <motion.div
      initial={{ x: "100vw", zIndex: 1301 }}
      exit={{ x: "100vw" }}
      animate={rootAnimation}
      className={classes.root}>
      <AppBar position='absolute'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            onClick={() => {
              drawerPage.setShowHome(true);
              drawerPage.setShowSettings(false);
            }}
            edge='start'
            className={classes.menuButton}
            aria-label='back'>
            <ArrowBackIosIcon />
          </IconButton>
          <h6 className={classes.settings}>Settings</h6>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarHeight}></div>

      {/* CHANGE NAME */}
      <SettingsTile title='Change name' onClick={() => setOpenChangeNameDialog(true)}>
        <div>
          <p>{name}</p>
          <ChevronRightIcon />
        </div>
      </SettingsTile>
      <FormDialog
        open={openChangeNameDialog}
        handleDialogClose={() => setOpenChangeNameDialog(false)}
        title='Change name'
        hasTextField={true}
        textFieldLabel='Name'
        textFieldInitalValue={name}
        buttons={[
          { text: "CANCEL", onClick: () => setOpenChangeNameDialog(false) },
          {
            text: "UPDATE",
            onClick: (_, value) => {
              if (value === name || value === "") return;
              LocalStorageHelper.set("name", value);
              data.userData?.updateProfile({ displayName: value }).catch((_e) => {
                const e: Error = _e;
                console.log("Error loging in: ", e.message);
              });
              setOpenChangeNameDialog(false);
            },
            disabledIf: (value) => value === name || value === "",
          },
        ]}
      />

      {/* RESET GRAPH */}
      <SettingsTile title='Reset Graph Positioning' onClick={() => setOpenResetGraphDialog(true)} />
      <FormDialog
        open={openResetGraphDialog}
        handleDialogClose={() => setOpenResetGraphDialog(false)}
        title='Reset graph'
        content='Set the positions of the nodes in the course graph to their default positions.'
        buttons={[
          { text: "CANCEL", onClick: () => setOpenResetGraphDialog(false) },
          {
            text: "CONTINUE",
            onClick: () => {
              data.graphData.resetGraphPositions();
              setOpenResetGraphDialog(false);
            },
          },
        ]}
      />

      {/* CLEAR DATA */}
      <SettingsTile title='Delete App Data' onClick={() => setOpenClearDataDialog(true)} />
      <FormDialog
        open={openClearDataDialog}
        handleDialogClose={() => setOpenClearDataDialog(false)}
        title='Clear Data'
        content='This would remove all your saved data including the list of your taken/taking courses.'
        buttons={[
          { text: "CANCEL", onClick: () => setOpenClearDataDialog(false) },
          {
            text: "CONTINUE",
            onClick: () => {
              localStorage.clear();
              window.location.reload();
            },
          },
        ]}
      />
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: "fixed",
      width: "100vw",
      height: "100vh",
      backgroundColor: "white",
      "& input": {
        color: "green !important",
      },
    },
    toolbar: {
      height: "var(--toolbarHeight) !important",
      minHeight: "var(--toolbarHeight) !important",
    },
    menuButton: {
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
  };
});

export default SettingsPage;
