import { Button, makeStyles } from "@material-ui/core";
import { AnimationControls, motion } from "framer-motion";
import GroupBySem from "../../components/GroupBySem";
import Legend from "../../components/Legend";
import TypewriterComponent from "typewriter-effect";
import { useHistory } from "react-router";
import updateCourseStatus from "../../functions/updateCourseStatus";
import { useContext, useEffect } from "react";
import clsx from "clsx";
import { LocalStorageHelper } from "../../classes/LocalStorageHelper";
import { HasIntroDataContext } from "../../CourseStatusWrapper";
import { DataContext } from "../../App";

interface Props {
  setHasIntroData: React.Dispatch<React.SetStateAction<boolean>>;
  exitAnimation: AnimationControls;
}

const IntroPage2: React.FC<Props> = ({ setHasIntroData, exitAnimation }) => {
  const classes = useStyles();
  const history = useHistory();
  const data = useContext(DataContext);
  const hasIntroData = useContext(HasIntroDataContext);
  const name = LocalStorageHelper.get<string>("name", "Ricardo");
  const taken = LocalStorageHelper.get<string[]>("taken", []);
  const taking = LocalStorageHelper.get<string[]>("taking", []);
  LocalStorageHelper.set("taken", taken);
  LocalStorageHelper.set("taking", taking);

  useEffect(() => {
    if (hasIntroData) history.push("/1");
  }, [hasIntroData, history]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.h4
        className='noselect'
        initial={{ y: "-300%" }}
        animate={{
          y: 0,
          transition: { delay: 1 },
        }}>
        Hello {name}!
      </motion.h4>
      <div style={{ verticalAlign: "top" }}>
        <div className={classes.left}>
          <img className='logo' src='/logo.png' alt='app logo' />
        </div>
        <div className={clsx(classes.right, "noselect")}>
          <TypewriterComponent
            onInit={(typewriter) => {
              typewriter.pauseFor(2000).typeString("SELECT ALL THE COURSES YOU HAVE TAKEN!").start();
            }}
            options={{
              delay: 15,
              cursor: "",
            }}
          />
        </div>
      </div>

      <div className={classes.coursesWrapper}>
        <Legend />
        <GroupBySem
          tighten={true}
          handleCourseTap={({ subject, setStatus }) => updateCourseStatus(subject, data.graphData.elements, setStatus)}
        />
      </div>

      <div className={classes.bottom}>
        <Button
          onTap={async () => {
            await exitAnimation.start({ opacity: 0, transition: { delay: 0.3 } });
            setHasIntroData(true);
          }}
          className='button-intro'
          component={motion.button}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.9 }}>
          NEXT
        </Button>
      </div>
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => ({
  coursesWrapper: {
    backgroundColor: "var(--white)",
    height: "55vh",
    overflowX: "scroll",
    padding: 8,
    verticalAlign: "top",
  },
  left: {
    display: "inline-block",
    textAlign: "right",
    width: "35%",
  },
  right: {
    display: "inline-block",
    textAlign: "left",
    width: "55%",
    verticalAlign: "top",
    padding: "1rem 0",
  },
  bottom: {
    position: "fixed",
    bottom: "5vh",
    width: "100vw",
  },
}));

export default IntroPage2;
