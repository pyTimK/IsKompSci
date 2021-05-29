const groupBySem = (courses) => {
  const groupedCourses = {};
  const specialCourses = {
    PE: ["1Y-1S", "1Y-2S", "2Y-1S", "2Y-2S"],
    NSTP: ["2Y-1S", "2Y-2S"],
  };

  const pushGroupedCourses = (sem, course) => {
    if (sem in groupedCourses) {
      groupedCourses[sem].push(course);
    } else {
      groupedCourses[sem] = [course];
    }
  };

  courses.forEach((course) => {
    if (course.subject in specialCourses) {
      specialCourses[course.subject].forEach((sem) => pushGroupedCourses(sem, course));
      return;
    }
    pushGroupedCourses(course.offered, course);
  });

  return groupedCourses;
};

export default groupBySem;
