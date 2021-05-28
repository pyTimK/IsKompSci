import { AnimatePresence } from "framer-motion";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import CourseDescrip1 from "./pages/CourseDescrip1";
import CourseDescrip2 from "./pages/CourseDescrip2";
import IntroPage1 from "./pages/IntroPage1";
import IntroPage2 from "./pages/IntroPage2";
import MainPage1 from "./pages/MainPage1";
import MainPage2 from "./pages/MainPage2";
import SettingsPage from "./pages/SettingsPage";

import useLocalStorage from "./hooks/useLocalStorage";
import useToggle from "./hooks/useToggle";

const CourseStatusWrapper = ({ courses, graphElements, groupedBySemCourses }) => {
  const [name, setName] = useLocalStorage("name", "");
  const [taken, setTaken] = useLocalStorage("taken", null);
  const [taking, setTaking] = useLocalStorage("taking", null);
  const [editMode, toggleEditMode] = useToggle();

  const hasName = name !== "";
  const hasTaken = taken !== null;
  const hasTaking = taking !== null;
  const hasIntroData = hasName && hasTaken && hasTaking;

  return (
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
            graphElements={graphElements}
            groupedBySemCourses={groupedBySemCourses}
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
                  graphElements={graphElements}
                  groupedBySemCourses={groupedBySemCourses}
                />
              </Route>
            </Switch>
            {/* </AnimatePresence> */}
          </Layout>
        </Route>
      </Switch>
    </AnimatePresence>
  );
};

export default CourseStatusWrapper;
