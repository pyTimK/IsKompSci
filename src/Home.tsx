import Layout from "./components/Layout.jsx";
import useToggle from "./hooks/useToggle";
import SettingsPage from "./pages/SettingsPage";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { CrossFadePageProvider } from "./contexts/CrossFadePageContext";
import { useState } from "react";
import FeedbackPage from "./pages/FeedbackPage";
import MainWrapper from "./pages/main/MainWrapper";
import { makeStyles } from "@material-ui/core";

const Home = ({ hasIntroData }) => {
  const divFullScreenAnimate = useAnimation();
  const classes = useStyles();
  const [editMode, toggleEditMode] = useToggle();
  const [showSettings, setShowSettings] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHome, setShowHome] = useState(true);
  return (
    <div className='home-vars'>
      <AnimatePresence>
        {showSettings && <SettingsPage setShowSettings={setShowSettings} setShowHome={setShowHome} />}
        {showFeedback && <FeedbackPage setShowFeedback={setShowFeedback} setShowHome={setShowHome} />}
      </AnimatePresence>
      {showHome && (
        <CrossFadePageProvider value={divFullScreenAnimate}>
          <motion.div className={classes.divFullScreenForTransition} animate={divFullScreenAnimate}></motion.div>
          <Layout
            hasIntroData={hasIntroData}
            editMode={editMode}
            toggleEditMode={toggleEditMode}
            setShowSettings={setShowSettings}
            setShowFeedback={setShowFeedback}>
            <MainWrapper editMode={editMode} />
          </Layout>
        </CrossFadePageProvider>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  divFullScreenForTransition: {
    position: "fixed",
    zIndex: 1101,
    backgroundColor: "var(--green)",
    opacity: 0,
  },
}));

export default Home;
