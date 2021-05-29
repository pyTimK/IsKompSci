import React from "react";
import CourseStatusWrapper from "./CourseStatusWrapper";
import getFromLocalStorage from "./functions/getFromLocalStorage";
import groupBySem from "./functions/groupBySem";
import initializeGraphElements from "./functions/initializeGraphElements";

function App() {
  const data = require("./data/data.json");
  const courses = data.courses;
  const groupedBySemCourses = groupBySem(courses);
  const taken = getFromLocalStorage("taken", []);
  const taking = getFromLocalStorage("taking", []);
  const savedGraphPositions = getFromLocalStorage("graphPositions", null);
  const graphElements = initializeGraphElements({ courses, taken, taking, savedGraphPositions });

  return (
    <div className="App">
      <CourseStatusWrapper graphElements={graphElements} groupedBySemCourses={groupedBySemCourses} />
    </div>
  );
}

export default App;
