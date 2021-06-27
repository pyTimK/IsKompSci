import { useContext } from "react";
import CourseBox, { HandleCourseTap } from "./CourseBox";
import { makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import { LocalStorageHelper } from "../classes/LocalStorageHelper";
import { DataContext } from "../App";

interface Props {
  tighten?: boolean;
  handleCourseTap: HandleCourseTap;
}

const GroupBySem: React.FC<Props> = ({ tighten = false, handleCourseTap }) => {
  const data = useContext(DataContext);
  const taken = LocalStorageHelper.get<string[]>("taken", []);
  const taking = LocalStorageHelper.get<string[]>("taking", []);
  const classes = useStyles({ tighten });

  return (
    <div id='group-by-sem-div'>
      {Object.entries(data.courseData.groupedBySem).map((semCourse, index) => {
        let totalUnits = 0;
        semCourse[1].forEach((course) => {
          if (!["PE", "NSTP"].includes(course.subject) && course.units) totalUnits += course.units;
        });
        return (
          <div className={classes.card} key={index}>
            <div>
              {semCourse[1].map((course) => {
                let subject = course.subject;
                if (["PE", "NSTP"].includes(subject)) subject = `${subject}-${semCourse[0]}`;

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

const useStyles = makeStyles<Theme, { tighten: boolean }>((theme) => ({
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
