import { Elements } from "react-flow-renderer";
import { LocalStorageHelper } from "../classes/LocalStorageHelper";

const updateCourseStatus = (
  subject: string,
  graphElements: Elements,
  setStatus: React.Dispatch<React.SetStateAction<string>>
) => {
  const updateGraphElement = (newStatus: string) => {
    if (!["PE-", "NSTP-"].some((specialSubject) => subject.startsWith(specialSubject))) {
      const nodeIndex = graphElements.findIndex((node) => node.id === subject);
      if (nodeIndex !== -1) graphElements[nodeIndex].className = newStatus;
    }
  };

  const taken = LocalStorageHelper.get<string[]>("taken", []);
  const taking = LocalStorageHelper.get<string[]>("taking", []);

  const addFromLocalStorage = (key: string, list: string[]) => LocalStorageHelper.set(key, [...list, subject]);
  const removeFromLocalStorage = (key: string, list: string[]) =>
    LocalStorageHelper.set(
      key,
      list.filter((takenCourse) => takenCourse !== subject)
    );

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
