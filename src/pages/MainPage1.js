import { AnimateSharedLayout, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import EditModeText from "../components/EditModeText";
import GroupBySem from "../components/GroupBySem";
import Legend from "../components/Legend";
import updateCourseStatus from "../functions/updateCourseStatus";

const MainPage1 = ({ editMode, graphElements, groupedBySemCourses }) => {
  const divAnimation = useAnimation();
  useEffect(() => {
    divAnimation.start({ opacity: 1 });
    window.scrollTo(0, 0);
  }, [divAnimation]);

  const showCourseDetails = ({}) => {
    //TODO
  };

  const handleCourseTap = ({ subject, setStatus }) => {
    if (editMode) {
      updateCourseStatus({ subject, graphElements, setStatus });
    } else {
      showCourseDetails({});
    }
  };
  return (
    <div className="main-bg">
      <motion.div className="main-wrapper" initial={{ opacity: 0 }} animate={divAnimation}>
        <AnimateSharedLayout>
          <EditModeText editMode={editMode} text="TAP TO CHANGE COURSE STATUS" />
          <motion.div layout>
            <GroupBySem
              groupedBySemCourses={groupedBySemCourses}
              handleCourseTap={({ subject, setStatus }) => handleCourseTap({ subject, setStatus })}
            />
          </motion.div>
          <Legend />
        </AnimateSharedLayout>
      </motion.div>
    </div>
  );
};

export default MainPage1;
