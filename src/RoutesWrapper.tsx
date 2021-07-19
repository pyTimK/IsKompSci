import { Route, Switch } from "react-router-dom";
import IntroWrapper from "./pages/intro/IntroWrapper";
import React, { useState } from "react";
import CoursePage from "./pages/course/CoursePage";
import { LocalStorageHelper } from "./classes/LocalStorageHelper";
import Home from "./pages/main/Home";
import SettingsPage from "./pages/settings/SettingsPage";
import FeedbackPage from "./pages/feedback/FeedbackPage";
import CrossFadeTransition from "./components/CrossFadeTransition";
import FallbackPage from "./pages/FallbackPage";

const name = LocalStorageHelper.get<string>("name", "");
const taken = LocalStorageHelper.get<string[]>("taken", []);
const taking = LocalStorageHelper.get<string[]>("taking", []);
const initialHasIntroData = name !== "" && taken !== [] && taking !== [];

export const HasIntroDataContext = React.createContext(initialHasIntroData);
const HasIntroDataProvider = HasIntroDataContext.Provider;

const RoutesWrapper: React.FC = () => {
  const [hasIntroData, setHasIntroData] = useState(initialHasIntroData);
  return (
    <HasIntroDataProvider value={hasIntroData}>
      <CrossFadeTransition>
        <Switch>
          <Route path='/intro/:page'>
            <IntroWrapper setHasIntroData={setHasIntroData} />
          </Route>

          <Route path='/course/:id'>
            <CoursePage />
          </Route>

          <Route path='/settings'>
            <SettingsPage />
          </Route>

          <Route path='/feedback'>
            <FeedbackPage />
          </Route>

          <Route exact path='/'>
            <Home />
          </Route>

          <Route>
            <FallbackPage />
          </Route>
        </Switch>
      </CrossFadeTransition>
    </HasIntroDataProvider>
  );
};
export default RoutesWrapper;
