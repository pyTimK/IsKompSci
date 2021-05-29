import { Button } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useHistory } from "react-router";
import setFromLocalStorage from "../functions/setFromLocalStorage";

const IntroPage1 = () => {
  const history = useHistory();
  const divAnimation = useAnimation();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let newName = document.getElementById("nameInput").value;
    if (newName !== "") {
      setFromLocalStorage("name", newName);
      await divAnimation.start({ opacity: 0, transition: { delay: 0.3 } });
      history.push("/intro2");
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
          <input id="nameInput" type="text" placeholder="What's your name?" maxLength="8" required />

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
        </form>
      </motion.div>
    </div>
  );
};

export default IntroPage1;
