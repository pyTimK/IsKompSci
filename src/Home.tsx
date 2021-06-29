import Layout from "./components/Layout";
import useToggle from "./hooks/useToggle";
import SettingsPage from "./pages/settings/SettingsPage";
import { AnimatePresence } from "framer-motion";
import React, { useMemo, useState } from "react";
import FeedbackPage from "./pages/feedback/FeedbackPage";
import MainWrapper from "./pages/main/MainWrapper";
import { useContext } from "react";
import { HasIntroDataContext } from "./CourseStatusWrapper";
import CrossFadeTransition from "./components/CrossFadeTransition";

export const DrawerPageContext = React.createContext<
  | {
      [key in "setShowSettings" | "setShowFeedback" | "setShowHome"]: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | null
>(null);
const DrawerPageProvider = DrawerPageContext.Provider;

export const EditModeContext = React.createContext<[boolean, () => void] | null>(null);
const EditModeProvider = EditModeContext.Provider;

const Home: React.FC = () => {
  const [editMode, toggleEditMode] = useToggle();
  const [showSettings, setShowSettings] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const hasIntroData = useContext(HasIntroDataContext);
  const drawerPageValues = useMemo(() => ({ setShowSettings, setShowFeedback, setShowHome }), []);

  return (
    <div className='home-vars'>
      <DrawerPageProvider value={drawerPageValues}>
        <AnimatePresence>
          {showSettings && <SettingsPage />}
          {showFeedback && <FeedbackPage />}
        </AnimatePresence>
        {showHome && (
          <CrossFadeTransition>
            <EditModeProvider value={[editMode, toggleEditMode]}>
              <Layout hasIntroData={hasIntroData}>
                <MainWrapper />
              </Layout>
            </EditModeProvider>
          </CrossFadeTransition>
        )}
      </DrawerPageProvider>
    </div>
  );
};

export default Home;
