import getFromLocalStorage from "../functions/getFromLocalStorage";
import CourseBox from "./CourseBox";

const GroupBySem = ({ tighten, groupedBySemCourses, handleCourseTap }) => {
  const taken = getFromLocalStorage("taken", []);
  const taking = getFromLocalStorage("taking", []);

  return (
    <div id="group-by-sem-div">
      {Object.entries(groupedBySemCourses).map((semCourse, index) => {
        console.log(semCourse[1]);
        let totalUnits = 0;
        semCourse[1].forEach((course) => {
          if (!["PE", "NSTP"].includes(course.subject) && course.units) totalUnits += course.units;
        });
        console.log(totalUnits);
        return (
          <div className={`sem-card${tighten ? " tighten-sem-card" : ""}`} key={index}>
            <div>
              {semCourse[1].map((course) => {
                let subject = course.subject;
                if (["PE", "NSTP"].includes(subject)) {
                  subject = `${subject}-${semCourse[0]}`;
                }
                let initialStatus = taken.includes(subject)
                  ? "taken"
                  : taking.includes(subject)
                  ? "taking"
                  : "not-taken";

                return (
                  <CourseBox
                    key={subject}
                    course={course}
                    handleCourseTap={handleCourseTap}
                    subject={subject}
                    initialStatus={initialStatus}
                  />
                );
              })}
            </div>
            <div className="sem-tag">
              <h5 className="sem-tag-left">{semCourse[0]}</h5>
              <div className="sem-tag-right">
                <p>{`${totalUnits} units`}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupBySem;
