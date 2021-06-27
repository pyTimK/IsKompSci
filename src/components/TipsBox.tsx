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
import MyDialog from "./MyDialog";
import Tip from "../classes/Tip";

interface Props {
  tip: Tip;
  uid: string;
  textArea: HTMLTextAreaElement;
  updateTipRef: React.MutableRefObject<Tip | null>;
  setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTipVisually: (id: string) => void;
}

const TipsBox: React.FC<Props> = ({ tip, uid, textArea, updateTipRef, setIsUpdateMode, deleteTipVisually }) => {
  const isLikedInitial = tip.likers.includes(uid);
  const isDislikedInitial = tip.dislikers.includes(uid);
  let likeCountWithoutUser = tip.likes;
  if (isLikedInitial) likeCountWithoutUser--;
  else if (isDislikedInitial) likeCountWithoutUser++;

  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(isLikedInitial);
  const [isDisliked, setIsDisliked] = useState(isDislikedInitial);
  const [likeCount, setLikeCount] = useState(tip.likes);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  //TODO Rename user to user_uid in firestore and code
  //TODO Rename tip.tip to tip.message in firestore and code
  const ownTip = uid === tip.uid;

  const handleLikeButtonTap = () => {
    // TODO CHECK widgets tree if UI, TIPS CLASS, FIRESTORE updates
    const newCount = isLiked ? likeCountWithoutUser : likeCountWithoutUser + 1;
    tip.updateLikes(isLiked, isDisliked, uid, newCount, "Like");
    setLikeCount(newCount);
    setIsLiked((prevIsLiked) => !prevIsLiked);
    setIsDisliked(false);
  };

  const handleDislikeButtonTap = () => {
    const newCount = isDisliked ? likeCountWithoutUser : likeCountWithoutUser - 1;
    tip.updateLikes(isLiked, isDisliked, uid, newCount, "Dislike");
    setLikeCount(newCount);
    setIsDisliked((prevIsdisLiked) => !prevIsdisLiked);
    setIsLiked(false);
  };

  const handleEditButtonTap = () => {
    if (!ownTip) {
      console.log("Error: You have no access for this tip");
      return;
    }
    textArea.value = tip.tip;
    updateTipRef.current = tip;
    textArea.focus();
    setIsUpdateMode(true);
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
    tip.ref.delete().catch((_e) => {
      const e: Error = _e;
      console.log("Error deleting: ", e.message);
    });
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
          <p>{tip.tip}</p>
          <div className={classes.actionsWrapper}>
            {ownTip && (
              <div className={classes.deleteUpdateWrapper}>
                <div className={classes.editWrapper}>
                  <IconButton onClick={handleEditButtonTap} aria-label='like'>
                    <motion.div whileTap={{ scale: 0.7 }}>
                      <EditOutlinedIcon className={classes.icons} />
                    </motion.div>
                  </IconButton>
                </div>
                <div className={classes.deleteWrapper}>
                  <IconButton onClick={handleDeletetButtonTap} aria-label='dislike'>
                    <motion.div whileTap={{ scale: 0.7 }}>
                      <DeleteOutlinedIcon className={classes.icons} />
                    </motion.div>
                  </IconButton>
                </div>
              </div>
            )}
            <IconButton onClick={handleLikeButtonTap} aria-label='like'>
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
            <IconButton onClick={handleDislikeButtonTap} aria-label='dislike'>
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
        title='Confirm Delete'
        content='Are you sure you want to delete this Tip?'
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
