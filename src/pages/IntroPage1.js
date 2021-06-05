import { Button, makeStyles } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../firebase";
import setFromLocalStorage from "../functions/setFromLocalStorage";
import SyncLoader from "react-spinners/SyncLoader";

const IntroPage1 = ({ hasIntroData }) => {
  const classes = useStyles();
  const history = useHistory();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const divAnimation = useAnimation();

  useEffect(() => {
    if (hasIntroData) history.push("/intro2");
  }, [hasIntroData, history]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let newName = inputRef.current.value;

    if (newName !== "") {
      setLoading(true);
      setFromLocalStorage("name", newName);
      auth
        .signInAnonymously()
        .then((result) => result.user.updateProfile({ displayName: newName }))
        .then(() => divAnimation.start({ opacity: 0, transition: { delay: 0.3 } }))
        .then(() => history.push("/intro2"))
        .catch((error) => {
          console.log("Error loging in: ", error.message);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    divAnimation.start({ opacity: 1 });
  }, [divAnimation]);

  return (
    <div className="intro-bg">
      <motion.div
        className="intro-wrapper"
        initial={{
          opacity: 0,
        }}
        animate={divAnimation}>
        <img className="logo" src="/logo.png" alt="app logo" />
        <h4>IsKompSci</h4>

        <form onSubmit={handleOnSubmit} className="bottom">
          <input
            className="my-input"
            ref={inputRef}
            type="text"
            placeholder="What's your name?"
            maxLength="8"
            required
          />

          {!loading && (
            <div className={classes.block}>
              <Button
                // variant="contained"
                // size="large"
                className="mybutton"
                component={motion.button}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}>
                Join
              </Button>
            </div>
          )}
          <SyncLoader color="var(--white)" loading={loading} />
        </form>
      </motion.div>
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    block: { display: "block" },
  };
});

export default IntroPage1;
