import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
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

const initializeGraphElements = (courses) => {
  const semSequence = [
    //
    "1Y-1S",
    "1Y-2S",
    "2Y-1S",
    "2Y-2S",
    "3Y-1S",
    "3Y-2S",
    "3Y-MS",
    "4Y-1S",
    "4Y-2S",
    "PE",
    "NSTP",
  ];
  const semCounts = new Array(semSequence.length).fill(0);

  //* ADD Course Nodes
  const graphElements = courses
    .map((course) => {
      let semIndex = semSequence.findIndex((sem) => sem === course.offered);
      semCounts[semIndex]++;
      return {
        id: course.subject,
        // type:
        data: {
          label: <>{course.subject}</>,
        },
        position: { x: 200 * (semCounts[semIndex] - 1), y: 100 * semIndex },
      };
    })
    .filter((course) => !["PE", "NSTP"].includes(course.id));

  //* ADD Edges
  courses.forEach((course) => {
    if (["PE", "NSTP"].includes(course.subject)) return;
    let prereqs = course.prerequisites === "" ? [] : course.prerequisites.split(", ");
    console.log(prereqs);
    prereqs.forEach((prereq) => {
      graphElements.push({ id: `e${prereq}-${course.subject}`, source: prereq, target: course.subject });
    });
  });

  return graphElements;
};

function App() {
  // const location = useLocation();
  const [name, setName] = useLocalStorage("name", "");
  const [taken, setTaken] = useLocalStorage("taken", null);
  const [taking, setTaking] = useLocalStorage("taking", null);
  const [editMode, toggleEditMode] = useToggle();

  const data = require("./data/data.json");
  const courses = data.courses;

  const initializedGraphElements = initializeGraphElements(courses);

  const [graphElements, setgraphElements] = useState(initializedGraphElements);

  const hasName = name !== "";
  const hasTaken = taken !== null;
  const hasTaking = taking !== null;
  const hasIntroData = hasName && hasTaken && hasTaking;

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch>
          <Route path="/intro1">
            <IntroPage1 name={name} setName={setName} />
          </Route>
          <Route path="/intro2">
            <IntroPage2
              setTaken={setTaken}
              setTaking={setTaking}
              name={name}
              hasIntroData={hasIntroData}
              courses={courses}
            />
          </Route>

          <Route path="/">
            <Layout name={name} hasIntroData={hasIntroData} editMode={editMode} toggleEditMode={toggleEditMode}>
              {/* <AnimatePresence exitBeforeEnter> */}
              <Switch>
                <Route path="/main2">
                  <MainPage2 key="main2" graphElements={graphElements} />
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
                  <MainPage1
                    key="main1"
                    name={name}
                    taken={taken}
                    taking={taking}
                    courses={courses}
                    editMode={editMode}
                    setTaken={setTaken}
                    setTaking={setTaking}
                  />
                </Route>
              </Switch>
              {/* </AnimatePresence> */}
            </Layout>
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
