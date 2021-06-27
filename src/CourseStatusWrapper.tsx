import { Route, Switch } from "react-router-dom";
import IntroWrapper from "./pages/intro/IntroWrapper";
import React, { useState } from "react";
import CoursePage from "./pages/course/CoursePage";
import { LocalStorageHelper } from "./classes/LocalStorageHelper";
import Home from "./Home";

const name = LocalStorageHelper.get<string>("name", "");
const taken = LocalStorageHelper.get<string[]>("taken", []);
const taking = LocalStorageHelper.get<string[]>("taking", []);
const initialHasIntroData = name !== "" && taken !== [] && taking !== [];

export const HasIntroDataContext = React.createContext(initialHasIntroData);
const HasIntroDataProvider = HasIntroDataContext.Provider;

const CourseStatusWrapper: React.FC = () => {
  const [hasIntroData, setHasIntroData] = useState(initialHasIntroData);

  return (
    <HasIntroDataProvider value={hasIntroData}>
      <Switch>
        <Route path='/intro/:page'>
          <IntroWrapper setHasIntroData={setHasIntroData} />
        </Route>

        <Route path='/course/:id'>
          <CoursePage />
        </Route>

        <Route path='/:animate?'>
          <Home />
        </Route>
      </Switch>
    </HasIntroDataProvider>
  );
};
export default CourseStatusWrapper;
