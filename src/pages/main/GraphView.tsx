import { makeStyles } from "@material-ui/core";
import { AnimateSharedLayout, motion, useAnimation } from "framer-motion";
import { useContext } from "react";
import { useEffect } from "react";
import EditModeText from "../../components/EditModeText";
import OverviewFlow from "../../components/OverviewFlow";
import { EditModeContext } from "./Home";

const GraphView: React.FC = () => {
  const editMode = useContext(EditModeContext);
  const classes = useStyles(editMode);
  const divAnimation = useAnimation();

  useEffect(() => {
    divAnimation.start({ opacity: 1 });
  }, [divAnimation]);

  return (
    <AnimateSharedLayout>
      <motion.div initial={{ opacity: 0 }} animate={divAnimation}>
        <EditModeText text='DRAG COURSES TO MODIFY VIEW' />
        {editMode && <hr className={classes.noMargin} />}
        <motion.div layout className={classes.flow}>
          <OverviewFlow />
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

export default GraphView;
