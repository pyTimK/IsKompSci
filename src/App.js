import React, { useState } from "react";
import { CoursesDataProvider } from "./contexts/CoursesDataContext";
import CourseStatusWrapper from "./CourseStatusWrapper.jsx";
import getFromLocalStorage from "./functions/getFromLocalStorage";
import groupBySem from "./functions/groupBySem";
import initializeGraphElements from "./functions/initializeGraphElements";
import setFromLocalStorage from "./functions/setFromLocalStorage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // console.log("size: ", window.screen.width, window.screen.height);
  // console.log("clientHeight: ", document.documentElement.clientHeight);
  const coursesJSON = require("./data/courses.json");
  const courses = coursesJSON.data;

  const groupedBySemCourses = groupBySem(courses);

  const initialGraphPositionsJSON = require("./data/graph-positions.json");
  const initialGraphPositions = initialGraphPositionsJSON.data;

  const taken = getFromLocalStorage("taken", []);
  const taking = getFromLocalStorage("taking", []);

  let savedGraphPositions = getFromLocalStorage("graphPositions");
  if (savedGraphPositions === null) {
    setFromLocalStorage("graphPositions", initialGraphPositions);
    savedGraphPositions = initialGraphPositions;
  }

  const [graphPositions, setgraphPositions] = useState(savedGraphPositions);

  const graphElements = initializeGraphElements({ courses, taken, taking, graphPositions });

  const data = {
    courses: courses,
    groupedBySemCourses: groupedBySemCourses,
    graphElements: graphElements,
    setgraphPositions: setgraphPositions,
  };

  return (
    <div className="App">
      <CoursesDataProvider value={data}>
        <CourseStatusWrapper />
      </CoursesDataProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
