import { makeStyles } from "@material-ui/core";

const Splash = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.logo} src="/logo.png" alt="app logo" />
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "var(--materialgreen)",
    },
    logo: {
      position: "absolute",
      width: "8rem",
      top: "50%",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
    },
  };
});

export default Splash;
