import { motion } from "framer-motion";

const GroupBySem = ({ tighten, taken, taking, courses, handleCourseTap }) => {
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

  const groupedBySemCourses = groupBySem(courses);

  return (
    <div id="group-by-sem-div">
      {Object.entries(groupedBySemCourses).map((semCourse, index) => {
        return (
          <div className={`sem-card${tighten ? " tighten-sem-card" : ""}`} key={index}>
            <div>
              {semCourse[1].map((course) => {
                let subject = course.subject;
                if (["PE", "NSTP"].includes(subject)) {
                  subject = `${subject}-${semCourse[0]}`;
                }

                let takenStatus = "not-taken";
                if (taken.includes(subject)) takenStatus = "taken";
                else if (taking.includes(subject)) takenStatus = "taking";

                return (
                  <motion.div
                    onTap={(e) => handleCourseTap({ e, course, subject, takenStatus })}
                    whileTap={{ scale: 0.8 }}
                    className={`course-box ${takenStatus}`}
                    key={course.id}>
                    <p>{course.subject}</p>
                  </motion.div>
                );
              })}
            </div>
            <h5 className="sem-tag">{semCourse[0]}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default GroupBySem;
