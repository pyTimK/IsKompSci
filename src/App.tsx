import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Splash from "./pages/Splash";
import { CourseData } from "./classes/CourseData";
import { GraphData } from "./classes/GraphData";
import { auth } from "./firebase";
import RoutesWrapper from "./RoutesWrapper";

const courseData = new CourseData();
const graphData = new GraphData(courseData.courses);
export const DataContext = React.createContext({ courseData, graphData, userData: auth.currentUser });
const DataProvider = DataContext.Provider;

const App: React.FC = () => {
  const [userData, setUserData] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserData(user);
      setLoading(false);
    });
  }, []);

  return (
    <div className='App'>
      <DataProvider value={{ courseData, graphData, userData }}>
        {loading ? <Splash /> : <RoutesWrapper />}
      </DataProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
