import { Route, Switch } from "react-router-dom";

import IntroPage1 from "./pages/IntroPage1";
import IntroPage2 from "./pages/IntroPage2";

import getFromLocalStorage from "./functions/getFromLocalStorage";
import { useState } from "react";
import Home from "./Home";
import CoursePage from "./pages/CoursePage";

const CourseStatusWrapper = () => {
  const name = getFromLocalStorage("name", "");
  const taken = getFromLocalStorage("taken", null);
  const taking = getFromLocalStorage("taking", null);
  const [hasIntroData, setHasIntroData] = useState(name !== "" && taken !== null && taking !== null);
  console.log("CourseStatusWrapper rendered");

  return (
    <Switch>
      <Route path="/intro1">
        <IntroPage1 />
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
  );
};

export default CourseStatusWrapper;
