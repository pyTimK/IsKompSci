const initializeGraphElements = ({ courses, taken, taking }) => {
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
      semCounts[semIndex]++;
      return {
        id: course.subject,
        className: taken.includes(course.subject) ? "taken" : taking.includes(course.subject) ? "taking" : "not-taken",
        //
        type: course.prerequisites === "" ? "input" : "default",
        data: {
          label: <>{course.subject}</>,
        },
        position: { x: 120 * (semCounts[semIndex] - 1), y: 100 * semIndex },
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
