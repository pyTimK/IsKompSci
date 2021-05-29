import { Route, Switch } from "react-router";
import Layout from "./components/Layout";
import useToggle from "./hooks/useToggle";
import CourseDescrip1 from "./pages/CourseDescrip1";
import CourseDescrip2 from "./pages/CourseDescrip2";
import MainPage1 from "./pages/MainPage1";
import MainPage2 from "./pages/MainPage2";
import SettingsPage from "./pages/SettingsPage";

const Home = ({ hasIntroData, graphElements, groupedBySemCourses }) => {
  const [editMode, toggleEditMode] = useToggle();
  return (
    <Layout hasIntroData={hasIntroData} editMode={editMode} toggleEditMode={toggleEditMode}>
      <Switch>
        <Route path="/main2">
          <MainPage2 graphElements={graphElements} />
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
          <MainPage1 editMode={editMode} graphElements={graphElements} groupedBySemCourses={groupedBySemCourses} />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Home;
