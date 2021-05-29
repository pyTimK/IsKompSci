const initializeGraphElements = ({ courses, taken, taking, savedGraphPositions }) => {
  // ? set true for AUTO GRAPH BETA
  const autoGraph = false;

  const hasSavedGraph = savedGraphPositions !== null;
  if ([taken, taking].some((r) => [null, undefined].includes(r))) return [];

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
      let position;
      if (!autoGraph && hasSavedGraph) {
        position = savedGraphPositions[course.subject];
      } else {
        semCounts[semIndex]++;
        position = { x: 120 * (semCounts[semIndex] - 1), y: 100 * semIndex };
      }

      return {
        id: course.subject,
        className: taken.includes(course.subject) ? "taken" : taking.includes(course.subject) ? "taking" : "not-taken",
        //
        type: course.prerequisites === "" ? "input" : "default",
        data: {
          label: <>{course.subject}</>,
        },
        position: position,
      };
    })
    .filter((course) => !["PE", "NSTP"].includes(course.id));

  //* ADD Edges
  courses.forEach((course) => {
    if (["PE", "NSTP"].includes(course.subject)) return;
    let prereqs = course.prerequisites === "" ? [] : course.prerequisites.split(", ");
    prereqs.forEach((prereq) => {
      graphElements.push({
        //
        id: `e${prereq}-${course.subject}`,
        source: prereq,
        target: course.subject,
        // arrowHeadType: "arrowclosed",
        animated: true,
      });
    });
  });

  return graphElements;
};
export default initializeGraphElements;
