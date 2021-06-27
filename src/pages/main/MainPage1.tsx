import { AnimateSharedLayout, motion, useAnimation } from "framer-motion";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import EditModeText from "../../components/EditModeText";
import GroupBySem from "../../components/GroupBySem";
import Legend from "../../components/Legend";
import updateCourseStatus from "../../functions/updateCourseStatus";
import { makeStyles } from "@material-ui/core";
import { DataContext } from "../../App";
import { HandleCourseTap } from "../../components/CourseBox";
import scrollTop from "../../functions/scrollTop";
import { EditModeContext } from "../../Home";

const MainPage1: React.FC = () => {
  const c = useStyles();
  const data = useContext(DataContext);
  const divAnimation = useAnimation();
  const history = useHistory();
  const editMode = useContext(EditModeContext)![0];
  useEffect(() => {
    divAnimation.start({ opacity: 1 });
    scrollTop();
  }, [divAnimation]);

  const showCourseDetails = (subject = "", exitAnimate: () => Promise<void>) => {
    if (subject === "") return;
    if (subject.startsWith("PE-")) subject = "PE";
    else if (subject.startsWith("NSTP-")) subject = "NSTP";
    subject = encodeURIComponent(subject);
    exitAnimate().then(() => history.push(`/course/${subject}`));
  };

  const handleCourseTap: HandleCourseTap = ({ subject, setStatus, exitAnimate }) => {
    if (editMode) {
      updateCourseStatus(subject, data.graphData.elements, setStatus);
    } else {
      showCourseDetails(subject, exitAnimate);
    }
  };
  return (
    <motion.div className={c.root} initial={{ opacity: 0 }} animate={divAnimation}>
      <AnimateSharedLayout>
        <EditModeText text='TAP TO CHANGE COURSE STATUS' />
        <motion.div layout>
          <GroupBySem handleCourseTap={handleCourseTap} />
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
