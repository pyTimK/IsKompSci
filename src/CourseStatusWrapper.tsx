import { Route, Switch } from "react-router-dom";

import IntroWrapper from "./pages/intro/IntroWrapper";
import { auth } from "./firebase";

import getFromLocalStorage from "./functions/getFromLocalStorage";
import { useEffect, useState } from "react";
import Home from "./Home.jsx";
import CoursePage from "./pages/course/CoursePage";
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
          <Route path='/intro/:page'>
            <IntroWrapper hasIntroData={hasIntroData} setHasIntroData={setHasIntroData} />
          </Route>

          <Route path='/course/:id'>
            <CoursePage hasIntroData={hasIntroData} />
          </Route>

          <Route path='/:animate?'>
            <Home hasIntroData={hasIntroData} />
          </Route>
        </Switch>
      )}
    </UserDataProvider>
  );
};

export default CourseStatusWrapper;
