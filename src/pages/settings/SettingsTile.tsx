import { makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import Ripples from "react-ripples";

interface Props {
  title: string;
  onClick: () => void;
}

const SettingsTile: React.FC<Props> = ({ title, onClick, children }) => {
  const classes = useStyles();
  return (
    <div>
      <Ripples during={1500} color='rgba(0, 0, 0, .2)'>
        <motion.div onClick={onClick} whileTap={{ backgroundColor: "rgba(0,0,0,0.1)" }} className={classes.row}>
          <div className={classes.left}>
            <h6 className={classes.title}>{title}</h6>
          </div>
          <div className={classes.right}>{children}</div>
        </motion.div>
      </Ripples>
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
    title: {
      fontSize: "1.1rem",
      letterSpacing: "0",
      display: "inline-block",
    },
    left: {
      display: "inline-block",
    },
    right: {
      position: "absolute",
      right: rowPadding,
      top: rowPadding,
      color: "var(--darkgray)",
      display: "inline-block",
      "& div": {
        display: "flex",
        alignItems: "center",
      },
    },
    hr: {
      border: "1px solid rgba(1,1,1,0.2)",
      borderBottom: "none",
      margin: "0",
    },
  };
});

export default SettingsTile;
