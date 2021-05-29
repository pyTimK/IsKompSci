import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { AnimateSharedLayout, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import EditModeText from "../components/EditModeText";
import OverviewFlow from "../components/OverviewFlow";

const MainPage2 = ({ editMode, graphElements }) => {
  const classes = useStyles(editMode);
  const divAnimation = useAnimation();

  useEffect(() => {
    divAnimation.start({ opacity: 1 });
  }, [divAnimation]);

  return (
    <div className="main-bg">
      <AnimateSharedLayout>
        <motion.div initial={{ opacity: 0 }} animate={divAnimation}>
          <EditModeText editMode={editMode} text="DRAG COURSES TO MODIFY VIEW" />
          {editMode && <hr className={classes.noMargin} />}
          <motion.div layout className={clsx("main2-wrapper", classes.flow)}>
            <OverviewFlow editMode={editMode} graphElements={graphElements} />
            {/* <h1>fds</h1> */}
          </motion.div>
        </motion.div>
      </AnimateSharedLayout>
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    flow: {
      // height: `100vh`,
      height: `calc(100vh - (var(--toolbarHeight) + var(--tabsHeight)))`,
      // height: (editMode) => `calc(100vh - (${theme.mixins.toolbar.minHeight}px + 48px + ${editMode ? 100 : 0}px))`,
    },
    noMargin: {
      margin: "8px 0 0 0 !important",
    },
  };
});

export default MainPage2;
