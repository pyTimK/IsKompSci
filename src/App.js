import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import useLocalStorage from "./hooks/useLocalStorage";
import useToggle from "./hooks/useToggle";
import CourseDescrip1 from "./pages/CourseDescrip1";
import CourseDescrip2 from "./pages/CourseDescrip2";
import IntroPage1 from "./pages/IntroPage1";
import IntroPage2 from "./pages/IntroPage2";
import MainPage1 from "./pages/MainPage1";
import MainPage2 from "./pages/MainPage2";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const [name, setName] = useLocalStorage("name", "");
  const [taken, setTaken] = useLocalStorage("taken", null);
  const [taking, setTaking] = useLocalStorage("taking", null);
  const [editMode, toggleEditMode] = useToggle();
  const data = require("./data/data.json");
  const courses = data.courses;

  const hasName = name !== "";
  const hasTaken = taken !== null;
  const hasTaking = taking !== null;
  const showAppbar = hasName && hasTaken && hasTaking;

  return (
    <div className="App">
      <Layout willShow={showAppbar} editMode={editMode} toggleEditMode={toggleEditMode}>
        <Switch>
          <Route path="/main2">
            <MainPage2 />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/coursedescrip1">
            <CourseDescrip1 />
          </Route>
          <Route path="/coursedescrip2">
            <CourseDescrip2 />
          </Route>
          <Route path="/">
            <AnimatePresence exitBeforeEnter initial={false}>
              {!hasName ? (
                <IntroPage1 setName={setName} key="intro1" />
              ) : !hasTaken || !hasTaking ? (
                <IntroPage2 key="intro2" setTaken={setTaken} setTaking={setTaking} name={name} courses={courses} />
              ) : (
                <MainPage1
                  key="main1"
                  taken={taken}
                  taking={taking}
                  courses={courses}
                  editMode={editMode}
                  setTaken={setTaken}
                  setTaking={setTaking}
                />
              )}
            </AnimatePresence>
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
