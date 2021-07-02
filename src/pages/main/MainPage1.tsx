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
import { EditModeContext } from "../Home";
import { CrossFadeTransitionContext } from "../../components/CrossFadeTransition";
import { Status, statusToColor } from "../../interfaces/Status";

const MainPage1: React.FC = () => {
  const c = useStyles();
  const data = useContext(DataContext);
  const divAnimation = useAnimation();
  const history = useHistory();
  const editMode = useContext(EditModeContext)![0];
  const crossFadeTransition = useContext(CrossFadeTransitionContext);
  useEffect(() => {
    divAnimation.start({ opacity: 1 });
    scrollTop();
  }, [divAnimation]);

  const showCourseDetails = (subject = "", status: Status, divRef: React.RefObject<HTMLButtonElement>) => {
    if (subject === "") return;
    if (subject.startsWith("PE-")) subject = "PE";
    else if (subject.startsWith("NSTP-")) subject = "NSTP";
    const encodedSubject = encodeURIComponent(subject);
    crossFadeTransition
      ?.exitAnimate({ initialColor: statusToColor(status), initialPosition: divRef })
      .then(() => history.push(`/course/${encodedSubject}`));
  };

  const handleCourseTap: HandleCourseTap = ({ subject, status, setStatus, divRef }) => {
    if (editMode) {
      updateCourseStatus(subject, data.graphData.elements, setStatus);
    } else {
      showCourseDetails(subject, status, divRef);
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
