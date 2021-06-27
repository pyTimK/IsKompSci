import { makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { useRef } from "react";
import { HTMLInputType } from "../../types/HTMLInputType";

interface Props {
  title: string;
  type: HTMLInputType;
  initialValue?: string;
}
const FeedbackTile: React.FC<Props> = ({ title, type, initialValue }) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <motion.div
        onClick={() => inputRef.current?.focus()}
        whileTap={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        className={classes.row}>
        <div className={classes.left}>
          <h6 className={classes.title}>{title}:</h6> &nbsp;
          <input
            className={classes.myInput}
            ref={inputRef}
            type={type}
            name={title.toLowerCase()}
            defaultValue={initialValue}
            required
          />
        </div>
      </motion.div>
      <hr className={classes.hr} />
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  const rowPadding = "16px";
  return {
    row: {
      position: "relative",
      width: `calc(100vw - 2 * ${rowPadding})`,
      padding: rowPadding,
      color: "black",
    },
    left: {
      display: "flex",
    },
    title: {
      fontSize: "1.1rem",
      letterSpacing: "0",
      color: "var(--darkgray)",
      display: "inline-block",
    },
    myInput: {
      fontFamily: "Metropolis",
      fontSize: "1.1rem",
      color: "black",
      border: "none",
      flexGrow: 1,
      backgroundColor: "transparent",
      "&:focus": {
        outline: "none",
      },
    },
    hr: {
      border: "1px solid rgba(1,1,1,0.2)",
      borderBottom: "none",
      margin: "0",
    },
  };
});

export default FeedbackTile;
