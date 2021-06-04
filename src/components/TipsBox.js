import { IconButton } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { fieldValue } from "../firebase";
import MyDialog from "./MyDialog";

const TipsBox = ({ tip, uid, inputRef, updateTipRef, setIsUpdateMode, deleteTipVisually }) => {
  const message = tip.tip || "";
  const likersInitial = tip.likers || [];
  const dislikersInitial = tip.dislikers || [];
  const isLikedInitial = likersInitial.includes(uid);
  const isDislikedInitial = dislikersInitial.includes(uid);
  const likeCountInitial = tip.likes || 0;
  let likeCountWithoutUser = likeCountInitial;
  if (isLikedInitial) likeCountWithoutUser--;
  else if (isDislikedInitial) likeCountWithoutUser++;
  const docRef = tip.ref;
  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(isLikedInitial);
  const [isDisliked, setIsDisliked] = useState(isDislikedInitial);
  const [likeCount, setLikeCount] = useState(likeCountInitial);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const ownTip = uid === tip.user;

  const handleLikeButtonTap = () => {
    const newCount = isLiked ? likeCountWithoutUser : likeCountWithoutUser + 1;
    setLikeCount(newCount);
    setIsLiked((prevIsLiked) => !prevIsLiked);

    const updates = {
      likes: isLiked ? fieldValue.increment(-1) : fieldValue.increment(1),
      likers: isLiked ? fieldValue.arrayRemove(uid) : fieldValue.arrayUnion(uid),
    };
    if (isDisliked) {
      updates.likes = fieldValue.increment(2);
      updates.dislikers = fieldValue.arrayRemove(uid);
    }

    docRef.update(updates).catch((error) => console.log("Error liking: ", error));

    setIsDisliked(false);
  };

  const handleDislikeButtonTap = () => {
    const newCount = isDisliked ? likeCountWithoutUser : likeCountWithoutUser - 1;
    setLikeCount(newCount);
    setIsDisliked((prevIsdisLiked) => !prevIsdisLiked);

    const updates = {
      likes: isDisliked ? fieldValue.increment(1) : fieldValue.increment(-1),
      dislikers: isDisliked ? fieldValue.arrayRemove(uid) : fieldValue.arrayUnion(uid),
    };
    if (isLiked) {
      updates.likes = fieldValue.increment(-2);
      updates.likers = fieldValue.arrayRemove(uid);
    }

    docRef.update(updates).catch((error) => console.log("Error disliking: ", error));

    setIsLiked(false);
  };

  const handleEditButtonTap = () => {
    if (!ownTip) {
      console.log("Error: You have no access for this tip");
      return;
    }
    inputRef.value = message;
    updateTipRef.current = tip;
    inputRef.focus();
    setIsUpdateMode(true);
    //
  };

  const handleDeletetButtonTap = () => {
    if (!ownTip) {
      console.log("Error: You have no access for this tip");
      return;
    }
    setIsOpenDialog(true);
  };

  const handleConfirmedDeletetButtonTap = () => {
    if (!ownTip) {
      console.log("Error: You have no access for this tip");
      return;
    }
    deleteTipVisually(tip.id);
    docRef.delete().catch((error) => console.log("Error deleting: ", error));
    setIsOpenDialog(false);
  };
  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: "-100px" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100px" }}
          layout
          className={classes.tipsBox}>
          <p>{message}</p>
          <div className={classes.actionsWrapper}>
            {ownTip && (
              <div className={classes.deleteUpdateWrapper}>
                <div className={classes.editWrapper}>
                  <IconButton onClick={handleEditButtonTap} aria-label="like">
                    <motion.div whileTap={{ scale: 0.7 }}>
                      <EditOutlinedIcon className={classes.icons} />
                    </motion.div>
                  </IconButton>
                </div>
                <div className={classes.deleteWrapper}>
                  <IconButton classes={classes.deleteIcon} onClick={handleDeletetButtonTap} aria-label="dislike">
                    <motion.div whileTap={{ scale: 0.7 }}>
                      <DeleteOutlinedIcon className={classes.icons} />
                    </motion.div>
                  </IconButton>
                </div>
              </div>
            )}
            <IconButton onClick={handleLikeButtonTap} aria-label="like">
              <AnimatePresence>
                {isLiked && (
                  <motion.div whileTap={{ scale: 0.7 }}>
                    <ThumbUpIcon className={classes.icons} />
                  </motion.div>
                )}
                {!isLiked && (
                  <motion.div whileTap={{ scale: 0.7 }}>
                    <ThumbUpOutlinedIcon className={classes.icons} />
                  </motion.div>
                )}
              </AnimatePresence>
            </IconButton>
            <h6>{likeCount}</h6>
            <IconButton onClick={handleDislikeButtonTap} aria-label="dislike">
              <AnimatePresence>
                {isDisliked && (
                  <motion.div whileTap={{ scale: 0.7 }}>
                    <ThumbDownIcon className={classes.icons} />
                  </motion.div>
                )}
                {!isDisliked && (
                  <motion.div whileTap={{ scale: 0.7 }}>
                    <ThumbDownOutlinedIcon className={classes.icons} />
                  </motion.div>
                )}
              </AnimatePresence>
            </IconButton>
          </div>
        </motion.div>
      </AnimatePresence>
      <MyDialog
        open={isOpenDialog}
        handleDialogClose={() => setIsOpenDialog(false)}
        title="Confirm Delete"
        content="Are you sure you want to delete this Tip?"
        buttons={[
          { text: "Cancel", onClick: () => setIsOpenDialog(false) },
          {
            text: "Delete",
            onClick: handleConfirmedDeletetButtonTap,
          },
        ]}
      />
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
    icons: {
      color: "var(--green) !important",
      margin: "0",
    },

    actionsWrapper: {
      width: "calc(100% + 12px)",
      textAlign: "right",
      transform: "translateY(12px)",
    },
    likesWrapper: {
      float: "right",
    },
    deleteUpdateWrapper: {
      float: "left",
      transform: "translateX(-12px)",
      textAlign: "left",
    },
    editWrapper: {
      float: "left",
    },
    deleteWrapper: {
      float: "left",
      transform: "translateX(-12px)",
    },
  };
});

export default TipsBox;
