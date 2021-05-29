import getFromLocalStorage from "./getFromLocalStorage";
import setFromLocalStorage from "./setFromLocalStorage";

const updateCourseStatus = ({ subject, graphElements, setStatus }) => {
  const updateGraphElement = (newStatus) => {
    if (!["PE-", "NSTP-"].some((specialSubject) => subject.startsWith(specialSubject))) {
      const nodeIndex = graphElements.findIndex((node) => node.id === subject);
      if (nodeIndex !== -1) {
        graphElements[nodeIndex].className = newStatus;
      }
    }
  };

  const taken = getFromLocalStorage("taken", []);
  const taking = getFromLocalStorage("taking", []);

  const addFromLocalStorage = (key, list) => {
    setFromLocalStorage(key, [...list, subject]);
  };
  const removeFromLocalStorage = (key, list) => {
    setFromLocalStorage(
      key,
      list.filter((takenCourse) => takenCourse !== subject)
    );
  };

  setStatus((prevStatus) => {
    let newStatus = "";

    if (prevStatus === "not-taken") {
      newStatus = "taken";
      addFromLocalStorage(newStatus, taken);
    } else if (prevStatus === "taken") {
      newStatus = "taking";
      removeFromLocalStorage(prevStatus, taken);
      addFromLocalStorage(newStatus, taking);
    } else {
      newStatus = "not-taken";
      removeFromLocalStorage(prevStatus, taking);
    }

    updateGraphElement(newStatus);
    return newStatus;
  });
};

export default updateCourseStatus;
