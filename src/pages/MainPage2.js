import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import OverviewFlow from "../components/OverviewFlow";

const MainPage2 = ({ graphElements }) => {
  const classes = useStyles();
  const divAnimation = useAnimation();

  useEffect(() => {
    divAnimation.start({ opacity: 1 });
  }, [divAnimation]);

  return (
    <div className="main-bg">
      <motion.div className={clsx("main2-wrapper", classes.flow)} initial={{ opacity: 0 }} animate={divAnimation}>
        <OverviewFlow graphElements={graphElements} />
      </motion.div>
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    flow: {
      height: `calc(100vh - (${theme.mixins.toolbar.minHeight}px + 48px))`,
    },
  };
});

export default MainPage2;
