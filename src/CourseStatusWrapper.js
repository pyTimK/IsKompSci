import { Route, Switch } from "react-router-dom";

import IntroPage1 from "./pages/IntroPage1";
import IntroPage2 from "./pages/IntroPage2";
import { auth } from "./firebase";

import getFromLocalStorage from "./functions/getFromLocalStorage";
import { useEffect, useState } from "react";
import Home from "./Home";
import CoursePage from "./pages/CoursePage";
import { UserDataProvider } from "./contexts/UserDataContext";
import Splash from "./pages/Splash";

const hasData = () => {
  const name = getFromLocalStorage("name", "");
  const taken = getFromLocalStorage("taken", null);
  const taking = getFromLocalStorage("taking", null);
  return name !== "" && taken !== null && taking !== null;
};

const CourseStatusWrapper = () => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [hasIntroData, setHasIntroData] = useState(hasData());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <UserDataProvider value={currentUser}>
      {loading && <Splash />}
      {!loading && (
        <Switch>
          <Route path="/intro1">
            <IntroPage1 hasIntroData={hasIntroData} />
          </Route>
          <Route path="/intro2">
            <IntroPage2 hasIntroData={hasIntroData} setHasIntroData={setHasIntroData} />
          </Route>

          <Route path="/course/:id">
            <CoursePage hasIntroData={hasIntroData} />
          </Route>

          <Route path="/:animate?">
            <Home hasIntroData={hasIntroData} />
          </Route>
        </Switch>
      )}
    </UserDataProvider>
  );
};

export default CourseStatusWrapper;
