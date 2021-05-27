import { Button, Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useHistory } from "react-router";

const IntroPage1 = ({ name, setName }) => {
  const history = useHistory();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    let newName = document.getElementById("nameInput").value;
    if (newName !== "") {
      setName(newName);
    }
  };

  useEffect(() => {
    if (name !== "") {
      history.push("/intro2");
    }
  }, [name]);

  return (
    <div className="intro-bg">
      <motion.div
        className="intro-wrapper"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}>
        <img className="logo" src="/logo.png" />
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
