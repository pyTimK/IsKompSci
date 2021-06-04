import { Button, makeStyles } from "@material-ui/core";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import TipsBox from "../components/TipsBox";
import { db, fieldValue } from "../firebase";
import { Shimmer } from "react-shimmer";
import UserDataContext from "../contexts/UserDataContext";

const shimmerWidth = window.screen.width * 0.8;
const shimmerWidthShort = window.screen.width * 0.3;

const CourseDescrip2 = ({ course }) => {
  const classes = useStyles();
  const isMounted = useRef(true);
  const inputRef = useRef();
  const [inputFocus, setInputFocus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tips, setTips] = useState([]);
  const lastDocQuery = useRef(null);
  const reachEndQuery = useRef(false);
  const user = useContext(UserDataContext);
  const subject = course.subject.split(/[^\w\d]/).join("_");
  const courseDocRef = db.collection("tips").doc(subject);

  //? FOR UPDATE
  const updateTipRef = useRef(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const createTip = (message) => {
    courseDocRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) return;
        return courseDocRef.set({ name: course.subject });
      })
      .then(() =>
        courseDocRef.collection("list").add({
          tip: message,
          likes: 0,
          user: user.uid || "noID",
          likers: [],
          dislikers: [],
          created: fieldValue.serverTimestamp(),
        })
      )
      .then((docRef) => docRef.get())
      .then((doc) => {
        //? NO ERRORS, NEW TIPS WILL RE-RENDER
        if (!isMounted.current) return;
        setTips((prevTips) => [{ ...doc.data(), id: doc.id, ref: doc.ref }, ...prevTips]);
        setLoading(false);
      })
      .catch((error) => {
        //TODO handle ui on error
        if (!isMounted.current) return;
        console.log("Error adding tip: ", error.message);
        setLoading(false);
        setError(error.message);
      });
  };

  const updateTip = (message) => {
    if (updateTipRef.current === null) {
      console.log("Error: updateTipRef does not exist");
      return;
    }
    updateTipRef.current.ref
      .update({ tip: message })
      .then(() => {
        //? NO ERRORS, NEW TIPS WILL RE-RENDER
        if (!isMounted.current) return;
        const newTips = tips.filter((tip) => updateTipRef.current.id !== tip.id);
        newTips.push({ ...updateTipRef.current, tip: message });
        setTips(newTips);
        setLoading(false);
      })
      .catch((error) => {
        //TODO handle ui on error
        if (!isMounted.current) return;
        console.log("Error updating tip: ", error.message);
        setLoading(false);
        setError(error);
      });
  };

  const deleteTipVisually = (id) => setTips((prevTips) => prevTips.filter((tip) => tip.id !== id));

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const message = inputRef.current.value;
    setInputFocus(false);
    setLoading(true);
    inputRef.current.value = "";

    if (isUpdateMode) {
      updateTip(message);
    } else {
      createTip(message);
    }
  };

  const getTips = useCallback(() => {
    const got_tips = [];
    const firstData = db
      .collection("tips")
      .doc(subject)
      //
      .collection("list")
      .orderBy("likes", "desc")
      .orderBy("created", "desc");

    const willGetData = lastDocQuery.current === null ? firstData : firstData.startAfter(lastDocQuery.current);

    willGetData
      .limit(3)
      .get()
      .then((querySnapshot) => {
        if (!isMounted.current) return;
        querySnapshot.forEach((doc) => got_tips.push({ ...doc.data(), id: doc.id, ref: doc.ref }));
        if (got_tips.length === 0) reachEndQuery.current = true;
        setTips((prevTips) => [...prevTips, ...got_tips]);
        setLoading(false);
        if (!reachEndQuery.current) lastDocQuery.current = querySnapshot.docs[querySnapshot.docs.length - 1];
      })
      .catch((error) => {
        //TODO handle ui on error
        if (!isMounted.current) return;
        console.log("Error getting tip: ", error.message);
        setLoading(false);
        setError(error.message);
      });
  }, [subject]);

  useEffect(() => {
    getTips();
    return () => (isMounted.current = false);
  }, [getTips]);

  useEffect(() => {
    function handleScroll() {
      if (!reachEndQuery.current) {
        var scrollMaxY =
          window.scrollMaxY || document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollMaxY === window.scrollY) {
          getTips();
        }
      }
    }

    window.addEventListener("scroll", handleScroll, false);
    return () => {
      window.removeEventListener("scroll", handleScroll, false);
    };
  }, [getTips, reachEndQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}
      className={classes.root}>
      <h4>Tips from your fellow students</h4>

      <AnimateSharedLayout>
        <motion.div>
          <form onFocus={(e) => setInputFocus(true)} className={classes.myForm} onSubmit={handleOnSubmit}>
            <motion.textarea
              className={classes.inputBox}
              ref={inputRef}
              initial={{ height: "16px" }}
              animate={{
                height: inputFocus ? "100px" : "16px",
                transition: { duration: 0.05, ease: "easeInOut" },
              }}
              // rows={inputFocus ? 5 : 1}
              type="text"
              placeholder="Have your own advice?"
              required
            />
            {inputFocus && (
              <motion.div
                initial={{
                  opacity: 0.6,
                }}
                animate={{
                  opacity: 1,
                }}
                className={classes.buttonWrapper}>
                <Button
                  onClick={() => {
                    inputRef.current.value = "";
                    setIsUpdateMode(false);
                    setInputFocus(false);
                  }}
                  className="mybutton4"
                  component={motion.div}
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}>
                  Cancel
                </Button>
                <Button
                  className="mybutton3"
                  component={motion.button}
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}>
                  {isUpdateMode ? "Update" : "Submit"}
                </Button>
              </motion.div>
            )}
          </form>
        </motion.div>
        {!loading && tips.length === 0 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classes.noTipsWrapper}>
            <p>There are no tips posted yet for this course</p>
            {/* <p>Share one now</p> */}
          </motion.div>
        )}
        {/* <AnimatePresence> */}
        {loading && (
          <motion.div layout initial={{ opacity: 1 }} exit={{ opacity: 0 }} className={classes.tipsBox}>
            <Shimmer height={12} width={shimmerWidthShort} className={classes.line} />
            <Shimmer height={12} width={shimmerWidth} className={classes.line} />
            <Shimmer height={12} width={shimmerWidth} className={classes.line} />
          </motion.div>
        )}
        {/* </AnimatePresence> */}
        <AnimateSharedLayout>
          {/* <motion.div layout> */}
          {tips.map((tip) => (
            //TODO modify isLikedInitial!
            <TipsBox
              key={tip.id}
              tip={tip}
              uid={user.uid}
              inputRef={inputRef.current}
              updateTipRef={updateTipRef}
              setIsUpdateMode={setIsUpdateMode}
              deleteTipVisually={deleteTipVisually}
            />
          ))}
          {/* </motion.div> */}
        </AnimateSharedLayout>
      </AnimateSharedLayout>
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => {
  const inputBoxPadding = 16;
  const borderWidth = 1;
  return {
    root: {
      "& h4": {
        fontWeight: 700,
        fontSize: "1.3rem",
        letterSpacing: 0,
      },
    },
    myForm: {
      marginTop: "24px",
    },
    inputBox: {
      // backgroundColor: "var(--green)",
      height: "auto",
      border: `${borderWidth}px solid var(--gray)`,
      borderRadius: "0.1rem",
      fontFamily: "Metropolis",
      fontSize: "1rem",
      letterSpacing: 0.3,
      fontWeight: 500,
      width: `calc(100% - 2 * ${borderWidth}px - 2 * ${inputBoxPadding}px)`,
      padding: `${inputBoxPadding}px`,
      transition: "0.3s",
      "&:focus": {
        outline: "none",
        // opacity: "0",

        border: `${borderWidth}px groove var(--orange)`,
      },
      "& h6": {
        fontFamily: "Roboto Mono",
        fontWeight: 500,
        color: "var(--green)",
        display: "inline",
        fontSize: "1.3rem",
        letterSpacing: 0,
      },
      "& p": {
        color: "var(--darkergray)",
        fontWeight: 500,
        fontSize: "1rem",
      },
    },
    buttonWrapper: {
      width: "100%",
      // backgroundColor: "var(--gray)",
      textAlign: "right",
    },

    loadingWrapper: {
      width: "100%",
      marginTop: "16px",
    },
    tipsBox: {
      // border: "2px groove var(--materialgreen)",
      borderRadius: "0.5rem",
      padding: "16px",
      paddingBottom: "5px",
      margin: "32px auto",
    },
    line: {
      borderRadius: "8px",
      marginBottom: "8px",
    },
    noTipsWrapper: {
      margin: "0 auto",
      width: "50%",
      marginTop: "32px",
      textAlign: "center",
      color: "var(--darkgreen)",
    },
  };
});

export default CourseDescrip2;
