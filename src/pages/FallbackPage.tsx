import { Button, makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const FallbackPage: React.FC = () => {
  const c = useStyles();
  const history = useHistory();
  return (
    <div className={c.root}>
      <h1 className={c.text1}>oh noes!</h1>
      <img className={c.img} src='/img/404_icon.png' alt='sad laptop' />
      <h6 className={c.text2}>404 - Page Not Found</h6>
      <Button
        onTap={() => {
          history.replace("/");
        }}
        className='button-descrip'
        component={motion.button}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}>
        Go Home
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "var(--white)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      justifyContent: "space-evenly",
    },

    text1: {
      fontWeight: 700,
      fontSize: "4rem",
      color: "var(--darkergray)",
    },

    text2: {
      fontWeight: 400,
      fontSize: "1.5rem",
      color: "var(--darkergray)",
      paddingBottom: "12px",
    },

    img: {
      width: "12rem",
    },
  };
});

export default FallbackPage;
