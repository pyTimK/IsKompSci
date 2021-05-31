import { IconButton, Typography } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import { makeStyles } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const TipsBox = ({ message = "", isLikedInitial = false, isDislikedInitial = false, likeCountInitial = 0 }) => {
  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(isLikedInitial);
  const [isDisliked, setIsDisliked] = useState(isDislikedInitial);
  const [likeCount, setLikeCount] = useState(likeCountInitial);

  const handleLikeButtonTap = (e) => {
    setLikeCount((prevLikeCount) => (isLiked ? prevLikeCount - 1 : prevLikeCount + 1));
    setIsLiked((prevIsLiked) => !prevIsLiked);
    setIsDisliked(false);
  };

  const handleDislikeButtonTap = (e) => {
    setLikeCount((prevLikeCount) => (isDisliked ? prevLikeCount + 1 : prevLikeCount - 1));
    setIsDisliked((prevIsdisLiked) => !prevIsdisLiked);
    setIsLiked(false);
  };
  return (
    <div className={classes.tipsBox}>
      <p>{message}</p>
      <div className={classes.actionsWrapper}>
        <IconButton onClick={handleLikeButtonTap} aria-label="like">
          <AnimatePresence>
            {isLiked && (
              <motion.div whileTap={{ scale: 0.7 }}>
                <ThumbUpIcon className={classes.thumbs} />
              </motion.div>
            )}
            {!isLiked && (
              <motion.div whileTap={{ scale: 0.7 }}>
                <ThumbUpOutlinedIcon className={classes.thumbs} />
              </motion.div>
            )}
          </AnimatePresence>
        </IconButton>
        <h6>{likeCount}</h6>
        <IconButton onClick={handleDislikeButtonTap} aria-label="dislike">
          <AnimatePresence>
            {isDisliked && (
              <motion.div whileTap={{ scale: 0.7 }}>
                <ThumbDownIcon className={classes.thumbs} />
              </motion.div>
            )}
            {!isDisliked && (
              <motion.div whileTap={{ scale: 0.7 }}>
                <ThumbDownOutlinedIcon className={classes.thumbs} />
              </motion.div>
            )}
          </AnimatePresence>
        </IconButton>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    tipsBox: {
      // backgroundColor: "var(--green)",
      border: "2px groove var(--materialgreen)",
      borderRadius: "0.5rem",
      padding: "16px",
      paddingBottom: "5px",
      margin: "32px auto",
      // boxShadow: "0px 3px 4px #666",
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
    thumbs: {
      color: "var(--green) !important",
    },

    actionsWrapper: {
      width: "100%",
      textAlign: "right",
    },
  };
});

export default TipsBox;
