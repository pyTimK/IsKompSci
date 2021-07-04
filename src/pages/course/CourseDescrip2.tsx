import { Button, makeStyles } from "@material-ui/core";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import TipsBox from "../../components/TipsBox";
import { Shimmer } from "react-shimmer";
import notify from "../../functions/notify";
import { DataContext } from "../../App";
import { Course } from "../../classes/Course";
import Tip from "../../classes/Tip";
import FireStoreHelper from "../../classes/FireStoreHelper";

const shimmerWidth = window.screen.width * 0.8;
const shimmerWidthShort = window.screen.width * 0.3;

interface Props {
  course: Course;
}

const CourseDescrip2: React.FC<Props> = ({ course }) => {
  const classes = useStyles();
  const [inputFocus, setInputFocus] = useState(false);
  const [loadingTip, setLoadingTip] = useState(true);
  const [tips, setTips] = useState<Tip[]>([]);
  const isMounted = useRef(true);
  const gettingTips = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const data = useContext(DataContext);
  const fireStoreHelper = useMemo(
    () => new FireStoreHelper(course.subject, data.userData),
    [course.subject, data.userData]
  );

  //? FOR UPDATE
  const updateTipRef = useRef<Tip | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const createTip = useCallback(
    async (message: string) => {
      try {
        const newTip = await fireStoreHelper.createTip(message);
        if (!isMounted.current) return;
        inputRef.current!.value = "";
        setTips((prevTips) => [newTip, ...prevTips]);
      } catch (_e) {
        const e: Error = _e;
        console.log("Error adding tip: ", e.message);
        if (!isMounted.current) return;
        notify(`Error: ${e.message}`, { duration: 5000 });
      }
      setLoadingTip(false);
    },
    [fireStoreHelper]
  );

  const updateTip = useCallback(
    async (message: string) => {
      if (updateTipRef.current === null) {
        notify(`Unexpected error in updating Tip`);
        console.log("Error: updateTipRef does not exist");
        return;
      }
      const toUpdateTip = updateTipRef.current;
      toUpdateTip.tip = message; //Updates Tip instance

      try {
        await fireStoreHelper.updateTip(message, toUpdateTip);

        if (!isMounted.current) return;
        inputRef.current!.value = "";
        setTips((prevTips) => {
          const newTips = prevTips.filter((tip) => toUpdateTip.id !== tip.id);
          newTips.unshift(toUpdateTip);
          return newTips;
        });
      } catch (_e) {
        const e: Error = _e;
        console.log("Error updating tip: ", e.message);
        if (!isMounted.current) return;
        notify(`Error: ${e.message}`, { duration: 5000 });
      }
      setLoadingTip(false);
    },
    [fireStoreHelper]
  );

  const deleteTipVisually = (id: string) => setTips((prevTips) => prevTips.filter((tip) => tip.id !== id));

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const message = inputRef.current!.value;
    setInputFocus(false);
    setIsUpdateMode(false);
    setLoadingTip(true);

    if (isUpdateMode) {
      updateTip(message);
    } else {
      createTip(message);
    }
  };

  /**
   * Gets the next three tips and updates the tips list.
   * @returns Whether the firestore call reached the end of the list.
   */
  const getTips = useCallback(async () => {
    let reachedEnd = false;
    gettingTips.current = true;
    try {
      const gotTips = await fireStoreHelper.getTips();
      reachedEnd = gotTips.length < 3;
      if (!isMounted.current) return false;
      if (gotTips.length !== 0) setTips((prevTips) => [...prevTips, ...gotTips]);
    } catch (_e) {
      const e: Error = _e;
      if (!isMounted.current) return false;
      console.log("Error getting tip: ", e.message);
      notify(`Error: ${e.message}`, { duration: 5000 });
    }
    gettingTips.current = false;
    return reachedEnd;
  }, [fireStoreHelper]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollMaxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollToLoad = scrollMaxY - 100;
      if (!gettingTips.current && scrollToLoad <= window.scrollY) {
        getTips().then((reachedEnd) => {
          if (reachedEnd) window.removeEventListener("scroll", handleScroll, false);
        });
      }
    };

    getTips().then((reachedEnd) => {
      setLoadingTip(false);
      if (!reachedEnd) window.addEventListener("scroll", handleScroll, false);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll, false);
      isMounted.current = false;
    };
  }, [getTips]);

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
        {!loadingTip && tips.length === 0 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classes.noTipsWrapper}>
            <p>There are no tips posted yet for this course</p>
          </motion.div>
        )}
        {loadingTip && (
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
