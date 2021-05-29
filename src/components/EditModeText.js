import { AnimatePresence, motion } from "framer-motion";

const EditModeText = ({ editMode, text }) => {
  return (
    <AnimatePresence>
      {editMode && (
        <motion.div
          layout
          className="main-center"
          initial={{
            opacity: 0.6,
            // y: "-100%",
            scaleY: 0,
          }}
          animate={{
            opacity: 1,
            // y: "0",
            scaleY: 1,
            transition: {
              // duration: 3,
            },
          }}
          exit={{
            opacity: 0,
            // y: "-100%",
            transition: { duration: 0.2 },
          }}>
          <h6>Edit Mode</h6>
          <p>{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditModeText;
