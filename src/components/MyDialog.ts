import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, DialogContentText } from "@material-ui/core";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyDialog = ({ open, handleDialogClose, title, content, buttons }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle style={{ color: "var(--darkergray)" }} id="alert-dialog-slide-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttons.map((button, index) => (
          <Button key={index} onClick={button.onClick} color="primary">
            {button.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
