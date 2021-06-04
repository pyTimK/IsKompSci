import React from "react";
import { CoursesDataProvider } from "./contexts/CoursesDataContext";
import CourseStatusWrapper from "./CourseStatusWrapper";
import getFromLocalStorage from "./functions/getFromLocalStorage";
import groupBySem from "./functions/groupBySem";
import initializeGraphElements from "./functions/initializeGraphElements";
import setFromLocalStorage from "./functions/setFromLocalStorage";

function App() {
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

  const graphElements = initializeGraphElements({ courses, taken, taking, savedGraphPositions });

  const data = { courses: courses, groupedBySemCourses: groupedBySemCourses, graphElements: graphElements };
  return (
    <div className="App">
      <CoursesDataProvider value={data}>
        <CourseStatusWrapper />
      </CoursesDataProvider>
    </div>
  );
}

export default App;
