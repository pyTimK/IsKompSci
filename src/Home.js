import { Route, Switch } from "react-router";
import Layout from "./components/Layout";
import useToggle from "./hooks/useToggle";
import MainPage1 from "./pages/MainPage1";
import MainPage2 from "./pages/MainPage2";
import SettingsPage from "./pages/SettingsPage";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { CrossFadePageProvider } from "./contexts/CrossFadePageContext";
import { useState } from "react";
import FeedbackPage from "./pages/FeedbackPage";

const Home = ({ hasIntroData }) => {
  const divFullScreenAnimate = useAnimation();
  const [editMode, toggleEditMode] = useToggle();
  const [showSettings, setShowSettings] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHome, setShowHome] = useState(true);
  return (
    <div className="home-wrapper">
      <AnimatePresence>
        {showSettings && <SettingsPage setShowSettings={setShowSettings} setShowHome={setShowHome} />}
        {showFeedback && <FeedbackPage setShowFeedback={setShowFeedback} setShowHome={setShowHome} />}
      </AnimatePresence>
      {showHome && (
        <CrossFadePageProvider value={divFullScreenAnimate}>
          <motion.div className="div-full-screen" animate={divFullScreenAnimate}></motion.div>
          <Layout
            hasIntroData={hasIntroData}
            editMode={editMode}
            toggleEditMode={toggleEditMode}
            setShowSettings={setShowSettings}
            setShowFeedback={setShowFeedback}>
            <Switch>
              <Route path="/main2">
                <MainPage2 editMode={editMode} />
              </Route>
              <Route path="/">
                <MainPage1 editMode={editMode} />
              </Route>
            </Switch>
          </Layout>
        </CrossFadePageProvider>
      )}
    </div>
  );
};

export default Home;
