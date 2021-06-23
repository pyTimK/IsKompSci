import { Button, makeStyles } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import setFromLocalStorage from "../../functions/setFromLocalStorage";
import SyncLoader from "react-spinners/SyncLoader";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import notify from "../../functions/notify";

const IntroPage1 = ({ hasIntroData }) => {
  const classes = useStyles();
  const history = useHistory();
  const inputRef = useRef();
  const [yrLvl, setYrLvl] = useState("");
  const [loading, setLoading] = useState(false);
  const divAnimation = useAnimation();

  const options = ["Freshman", "Sophomore", "Junior", "Senior", "N/A"];

  useEffect(() => {
    if (hasIntroData) history.push("/intro/2");
  }, [hasIntroData, history]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let newName = inputRef.current.value;

    if (newName === "") notify("Name Field is Required");
    else if (yrLvl === "") notify("Please Select Year Level First");
    else {
      setLoading(true);
      setFromLocalStorage("name", newName);
      setFromLocalStorage("yrLvl", `${yrLvl} Standing`);
      auth
        .signInAnonymously()
        .then((result) =>
          result.user.updateProfile({
            displayName: newName,
          })
        )
        .then(() =>
          divAnimation.start({
            opacity: 0,
            transition: {
              delay: 0.3,
            },
          })
        )
        .then(() => history.push("/intro/2"))
        .catch((error) => {
          console.log("Error loging in: ", error.message);
          setLoading(false);
        });
    }
  };

  const hadleYearLvlChange = (arg) => {
    setYrLvl(arg.value);
  };

  useEffect(() => {
    divAnimation.start({
      opacity: 1,
    });
  }, [divAnimation]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={divAnimation}>
      <img className='logo' src='/logo.png' alt='app logo' />
      <h4> IsKompSci </h4>
      <div className={classes.bottom}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inputRef.current.blur();
          }}>
          <input className={classes.input} ref={inputRef} type='text' placeholder="What's your name?" maxLength='8' />
        </form>
        <Dropdown
          className={classes.dropdown}
          menuClassName={classes.menuClassName}
          placeholderClassName={classes.placeholderClassName}
          options={options}
          onChange={hadleYearLvlChange}
          placeholder='Select Year Level'
        />
        {!loading && (
          <div className={classes.block}>
            <Button
              onClick={handleOnSubmit}
              // variant="contained"
              // size="large"
              className='button-intro'
              component={motion.button}
              whileHover={{
                scale: 1.2,
                transition: {
                  duration: 0.3,
                },
              }}
              whileTap={{
                scale: 0.9,
              }}>
              Join
            </Button>
          </div>
        )}
        <SyncLoader color='var(--white)' loading={loading} />
      </div>
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    bottom: {
      marginTop: "15vh",
      width: "100vw",
    },
    block: {
      display: "block",
    },
    dropdown: {
      textAlign: "left",
      width: "calc(60% + 1rem)",
      borderRadius: "8.5rem",
      margin: "36px auto",
      boxShadow: "0 1px 10px rgb(54, 54, 54)",
      [theme.breakpoints.up("sm")]: {
        width: "40%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "20%",
      },
    },
    menuClassName: {
      boxShadow: "0 1px 10px rgb(54, 54, 54)",
    },
    placeholderClassName: {
      color: "var(--darkgray)",
    },
    input: {
      width: "60%",
      fontSize: "1.2rem",
      margin: "20px auto",
      textAlign: "left",
      borderRadius: "0.5rem",
      border: "none",
      padding: "1rem 1.5rem",
      display: "block",
      fontFamily: "metropolis",
      letterSpacing: "0.1rem",
      boxShadow: "0 1px 10px rgb(54, 54, 54)",
      transition: "all 0.3s ease",
      "&:focus": {
        outline: "none",
        boxShadow: "0 2px 15px var(--darkgreen)",
      },
      [theme.breakpoints.up("sm")]: {
        width: "40%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "20%",
      },
    },
  };
});

export default IntroPage1;
