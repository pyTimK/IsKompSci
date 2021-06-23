import getFromLocalStorage from "../functions/getFromLocalStorage";
import CourseBox from "./CourseBox";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const GroupBySem = ({ tighten, groupedBySemCourses, handleCourseTap }) => {
  const taken = getFromLocalStorage("taken", []);
  const taking = getFromLocalStorage("taking", []);
  const classes = useStyles({ tighten });

  return (
    <div id='group-by-sem-div'>
      {Object.entries(groupedBySemCourses).map((semCourse, index) => {
        let totalUnits = 0;
        semCourse[1].forEach((course) => {
          if (!["PE", "NSTP"].includes(course.subject) && course.units) totalUnits += course.units;
        });
        return (
          <div className={classes.card} key={index}>
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
            <div className={clsx(classes.tag, "noselect")}>
              <h5 className={classes.tagLeft}>{semCourse[0]}</h5>
              <div className={classes.tagRight}>
                <p>{`${totalUnits} units`}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  card: ({ tighten }) => ({
    backgroundColor: "#fff",
    boxShadow: "3px 6px 12px var(--gray)",
    textAlign: "left",
    margin: `${tighten ? 16 : 42}px 0`,
    padding: 4,
    borderRadius: "0.4rem",
  }),
  tag: {
    color: "var(--darkgray)",
    paddingTop: 8,
    display: "flex",
    alignItems: "baseline",
    paddingBottom: 4,
  },

  tagLeft: {
    fontWeight: 700,
  },

  tagRight: {
    flexGrow: 1,
    textAlign: "right",
    fontWeight: 400,
  },
}));

export default GroupBySem;
