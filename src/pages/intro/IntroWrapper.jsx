import { makeStyles } from "@material-ui/core";
import { useAnimation, motion } from "framer-motion";
import { Route, Switch } from "react-router-dom";
import IntroPage1 from "./IntroPage1";
import IntroPage2 from "./IntroPage2";

const IntroWrapper = ({ hasIntroData, setHasIntroData }) => {
  const c = useStyles();
  const exitAnimation = useAnimation();

  return (
    <motion.div className={c.background} animate={exitAnimation} exit={{ opacity: 0 }}>
      <div className={c.wrapper}>
        <Switch>
          <Route path='/intro/1'>
            <IntroPage1 hasIntroData={hasIntroData} />
          </Route>
          <Route path='/intro/2'>
            <IntroPage2 hasIntroData={hasIntroData} setHasIntroData={setHasIntroData} exitAnimation={exitAnimation} />
          </Route>
        </Switch>
      </div>
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => {
  const padding = "5vh";
  return {
    background: {
      width: "100vw",
      height: "100vh",
      backgroundImage: "linear-gradient(var(--green), var(--lightgreen))",
    },
    wrapper: {
      width: "100vw",
      height: `calc(100vh - ${padding})`,
      paddingTop: `${padding}`,
      color: "white",
      textAlign: "center",
    },
  };
});

export default IntroWrapper;
