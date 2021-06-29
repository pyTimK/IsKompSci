import { Button, makeStyles } from "@material-ui/core";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import TipsBox from "../../components/TipsBox";
import { db } from "../../firebase";
import { Shimmer } from "react-shimmer";
import notify from "../../functions/notify";
import { DataContext } from "../../App";
import { Course } from "../../classes/Course";
import Tip, { DocTip } from "../../classes/Tip";
import firebase from "firebase/app";

const shimmerWidth = window.screen.width * 0.8;
const shimmerWidthShort = window.screen.width * 0.3;

interface Props {
  course: Course;
}

const CourseDescrip2: React.FC<Props> = ({ course }) => {
  const classes = useStyles();
  const isMounted = useRef(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputFocus, setInputFocus] = useState(false);
  const [loadingSetTip, setLoadingSetTip] = useState(false);
  const [loadingGetTip, setLoadingGetTip] = useState(false);
  const [tips, setTips] = useState<Tip[]>([]);
  const lastDocQuery = useRef<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> | null>(null);
  const reachEndQuery = useRef(false);
  const data = useContext(DataContext);
  const subject = course.subject.split(/[^\w\d]/).join("_");
  const courseDocRef = db.collection("tips").doc(subject);

  //? FOR UPDATE
  const updateTipRef = useRef<Tip | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const createTip = (message: string) => {
    const newDocTip = Tip.createDocTip(data.userData, message);
    courseDocRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) return;
        return courseDocRef.set({ name: course.subject });
      })
      .then(() => courseDocRef.collection("list").add(newDocTip))
      .then((docRef) => {
        //? NO ERRORS, NEW TIPS WILL RE-RENDER
        if (!isMounted.current) return;
        setTips((prevTips) => [new Tip(newDocTip, docRef.id, docRef), ...prevTips]);
        setLoadingSetTip(false);
        inputRef.current!.value = "";
      })
      .catch((_e) => {
        const e: Error = _e;
        if (!isMounted.current) return;
        console.log("Error adding tip: ", e.message);
        setLoadingSetTip(false);
        notify(`Error: ${e.message}`, { duration: 5000 });
      });
  };

  const updateTip = (message: string) => {
    if (updateTipRef.current === null) {
      console.log("Error: updateTipRef does not exist");
      return;
    }
    const updatedTip = updateTipRef.current;
    updatedTip.tip = message;
    updatedTip.ref
      .update({ tip: message })
      .then(() => {
        //? NO ERRORS, NEW TIPS WILL RE-RENDER
        if (!isMounted.current) return;
        const newTips = tips.filter((tip) => updatedTip.id !== tip.id);
        newTips.unshift(updatedTip);
        setTips(newTips);
        setLoadingSetTip(false);
        inputRef.current!.value = "";
      })
      .catch((_e) => {
        const e: Error = _e;
        if (!isMounted.current) return;
        console.log("Error updating tip: ", e.message);
        setLoadingSetTip(false);
        notify(`Error: ${e.message}`, { duration: 5000 });
      });
  };

  const deleteTipVisually = (id: string) => setTips((prevTips) => prevTips.filter((tip) => tip.id !== id));

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const message = inputRef.current!.value;
    setInputFocus(false);
    setIsUpdateMode(false);
    setLoadingSetTip(true);

    if (isUpdateMode) {
      updateTip(message);
    } else {
      createTip(message);
    }
  };

  const getTips = useCallback(async () => {
    setLoadingGetTip(true);
    const got_tips: Tip[] = [];
    const firstData = db
      .collection("tips")
      .doc(subject)
      .collection("list")
      .orderBy("likes", "desc")
      .orderBy("created", "desc");

    const willGetData = lastDocQuery.current === null ? firstData : firstData.startAfter(lastDocQuery.current);

    try {
      const querySnapshot = await willGetData.limit(3).get();
      if (!isMounted.current) return;
      querySnapshot.forEach((doc) => got_tips.push(new Tip(doc.data() as DocTip, doc.id, doc.ref)));
      if (got_tips.length === 0) reachEndQuery.current = true;
      setTips((prevTips) => [...prevTips, ...got_tips]);
      setLoadingGetTip(false);
      if (!reachEndQuery.current) lastDocQuery.current = querySnapshot.docs[querySnapshot.docs.length - 1];
    } catch (_e) {
      const e: Error = _e;
      if (!isMounted.current) return;
      console.log("Error getting tip: ", e.message);
      setLoadingGetTip(false);
      notify(`Error: ${e.message}`, { duration: 5000 });
    }
  }, [subject]);

  useEffect(() => {
    function handleScroll() {
      if (!reachEndQuery.current) {
        var scrollMaxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollMaxY <= window.scrollY) getTips();
      } else window.removeEventListener("scroll", handleScroll, false);
    }

    getTips().then(() => window.addEventListener("scroll", handleScroll, false));

    return () => {
      window.removeEventListener("scroll", handleScroll, false);
      isMounted.current = false;
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
              placeholder='Have your own advice?'
              required
            />
            {inputFocus && (
              <motion.div initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className={classes.buttonWrapper}>
                <Button
                  onClick={() => {
                    inputRef.current!.value = "";
                    setIsUpdateMode(false);
                    setInputFocus(false);
                  }}
                  className='button-tips-cancel'
                  component={motion.div}
                  whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.9 }}>
                  Cancel
                </Button>
                <Button
                  className='button-tips-submit'
                  component={motion.button}
                  whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.9 }}>
                  {isUpdateMode ? "Update" : "Submit"}
                </Button>
              </motion.div>
            )}
          </form>
        </motion.div>
        {!loadingGetTip && tips.length === 0 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classes.noTipsWrapper}>
            <p>There are no tips posted yet for this course</p>
          </motion.div>
        )}
        {loadingSetTip && (
          <motion.div layout initial={{ opacity: 1 }} exit={{ opacity: 0 }} className={classes.tipsBox}>
            <Shimmer height={12} width={shimmerWidthShort} className={classes.line} />
            <Shimmer height={12} width={shimmerWidth} className={classes.line} />
            <Shimmer height={12} width={shimmerWidth} className={classes.line} />
          </motion.div>
        )}
        <AnimateSharedLayout>
          {tips.map((tip) => (
            //TODO modify isLikedInitial!
            <TipsBox
              key={tip.id}
              tip={tip}
              uid={data.userData?.uid ?? "noID"}
              textArea={inputRef.current!}
              updateTipRef={updateTipRef}
              setIsUpdateMode={setIsUpdateMode}
              deleteTipVisually={deleteTipVisually}></TipsBox>
          ))}
        </AnimateSharedLayout>
        {loadingGetTip && (
          <motion.div layout initial={{ opacity: 1 }} exit={{ opacity: 0 }} className={classes.tipsBox}>
            <Shimmer height={12} width={shimmerWidthShort} className={classes.line} />
            <Shimmer height={12} width={shimmerWidth} className={classes.line} />
            <Shimmer height={12} width={shimmerWidth} className={classes.line} />
          </motion.div>
        )}
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
      textAlign: "right",
    },

    loadingWrapper: {
      width: "100%",
      marginTop: "16px",
    },
    tipsBox: {
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
