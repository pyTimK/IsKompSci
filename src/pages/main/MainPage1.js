import { AnimateSharedLayout, motion, useAnimation } from "framer-motion";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import EditModeText from "../../components/EditModeText";
import GroupBySem from "../../components/GroupBySem";
import Legend from "../../components/Legend";
import CoursesDataContext from "../../contexts/CoursesDataContext";
import updateCourseStatus from "../../functions/updateCourseStatus";
import { makeStyles } from "@material-ui/core";

const MainPage1 = ({ editMode }) => {
  const c = useStyles();
  const data = useContext(CoursesDataContext);
  const groupedBySemCourses = data.groupedBySemCourses;
  const graphElements = data.graphElements;
  const divAnimation = useAnimation();
  const history = useHistory();
  useEffect(() => {
    divAnimation.start({ opacity: 1 });
    window.scrollTo(0, 0);
  }, [divAnimation]);

  const showCourseDetails = ({ subject = "", exitAnimate }) => {
    if (subject === "") return;
    if (subject.startsWith("PE-")) subject = "PE";
    else if (subject.startsWith("NSTP-")) subject = "NSTP";
    subject = encodeURIComponent(subject);
    exitAnimate().then(() => history.push(`/course/${subject}`));
  };

  const handleCourseTap = ({ subject, setStatus, exitAnimate }) => {
    if (editMode) {
      updateCourseStatus({ subject, graphElements, setStatus });
    } else {
      showCourseDetails({ subject, exitAnimate });
    }
  };
  return (
    <motion.div className={c.root} initial={{ opacity: 0 }} animate={divAnimation}>
      <AnimateSharedLayout>
        <EditModeText editMode={editMode} text='TAP TO CHANGE COURSE STATUS' />
        <motion.div layout>
          <GroupBySem groupedBySemCourses={groupedBySemCourses} handleCourseTap={handleCourseTap} />
        </motion.div>
        <Legend />
      </AnimateSharedLayout>
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: { padding: "0 16px" },
  };
});

export default MainPage1;