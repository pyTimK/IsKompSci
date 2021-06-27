import { makeStyles } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { EditModeContext } from "../Home";

interface Props {
  text: string;
}

const EditModeText: React.FC<Props> = ({ text }) => {
  const c = useStyles();
  const editMode = useContext(EditModeContext)![0];
  return (
    <AnimatePresence>
      {editMode && (
        <motion.div
          layout
          className={c.root}
          initial={{ opacity: 0.6, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}>
          <div className={c.bottom}>
            <h6>Edit Mode</h6>
            <p>{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "var(--editModeTextHeight)",
      verticalAlign: "text-bottom",
      color: "var(--darkgray)",
      textAlign: "center",
      "& h6": {
        fontWeight: 600,
      },
    },
    bottom: {
      position: "absolute",
      bottom: 0,
      width: "100%",
    },
  };
});

export default EditModeText;
