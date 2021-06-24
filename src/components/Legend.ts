import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const Legend = () => {
  const c = useStyles();
  const items = [
    ["Taken", "taken"],
    ["Taking", "taking"],
    ["Not Taken", "not-taken"],
  ];
  return (
    <div className={c.root}>
      {items.map((item, index) => (
        <div className={c.item} key={index}>
          <div className={clsx(c.circle, item[1])}></div>
          <div className={clsx(c.label, "noselect")}>{item[0]}</div>
        </div>
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: "var(--darkgray)",
    textAlign: "center",
    paddingBottom: 16,

    "& div": {
      display: "inline-block",
    },
  },

  item: {
    width: "32%",
  },

  circle: {
    width: "0.8rem",
    height: "0.8rem",
    marginRight: 4,
    borderRadius: "0.4rem",
  },

  label: {
    fontSize: "0.8rem",
    letterSpacing: "0.05rem",
    fontWeight: 400,
  },
}));

export default Legend;
