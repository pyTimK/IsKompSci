const updateCourseStatus = ({ subject, takenStatus, setTaken, setTaking, graphElements }) => {
  const updateGraphElement = (newTakenStatus) => {
    if (!["PE-", "NSTP-"].some((specialSubject) => subject.startsWith(specialSubject))) {
      const nodeIndex = graphElements.findIndex((node) => node.id === subject);
      if (nodeIndex !== -1) {
        graphElements[nodeIndex].className = newTakenStatus;
      }
    }
  };

  if (takenStatus === "not-taken") {
    setTaken((prevTaken) => [...prevTaken, subject]);
    updateGraphElement("taken");
  } else if (takenStatus === "taken") {
    setTaken((prevTaken) => prevTaken.filter((takenCourse) => takenCourse !== subject));
    setTaking((prevTaking) => [...prevTaking, subject]);
    updateGraphElement("taking");
  } else {
    setTaking((prevTaking) => prevTaking.filter((takenCourse) => takenCourse !== subject));
    updateGraphElement("not-taken");
  }
};

export default updateCourseStatus;
