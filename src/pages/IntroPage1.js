import { Button, Typography } from "@material-ui/core";
import { motion } from "framer-motion";

const IntroPage1 = ({ setName }) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    let name = document.getElementById("nameInput").value;
    if (name !== "") {
      setName(name);
    }
  };

  return (
    <div className="intro-wrapper">
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
    </div>
  );
};

export default IntroPage1;
