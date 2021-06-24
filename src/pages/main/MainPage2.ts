import { makeStyles } from "@material-ui/core";
import { AnimateSharedLayout, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import EditModeText from "../../components/EditModeText";
import OverviewFlow from "../../components/OverviewFlow";

const MainPage2 = ({ editMode }) => {
  const classes = useStyles(editMode);
  const divAnimation = useAnimation();

  useEffect(() => {
    divAnimation.start({ opacity: 1 });
  }, [divAnimation]);

  return (
    <AnimateSharedLayout>
      <motion.div initial={{ opacity: 0 }} animate={divAnimation}>
        <EditModeText editMode={editMode} text='DRAG COURSES TO MODIFY VIEW' />
        {editMode && <hr className={classes.noMargin} />}
        <motion.div layout className={classes.flow}>
          <OverviewFlow editMode={editMode} />
          {/* <h1>fds</h1> */}
        </motion.div>
      </motion.div>
    </AnimateSharedLayout>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    flow: {
      height: (editMode) =>
        `calc(100vh - (var(--toolbarHeight) + var(--tabsHeight) + ${
          editMode ? "var(--editModeTextHeight)  + var(--editModeDividerTopMargin) + 2px" : "0px"
        }))`,
      width: "100%",
      bottom: 0,
    },
    noMargin: {
      margin: "var(--editModeDividerTopMargin) 0 0 0 !important",
    },
  };
});

export default MainPage2;
