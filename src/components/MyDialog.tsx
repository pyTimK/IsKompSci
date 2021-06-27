import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, DialogContentText } from "@material-ui/core";
import React from "react";
import { TransitionProps } from "@material-ui/core/transitions";

export const TransitionComponentForDialog = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  handleDialogClose: () => void;
  title: string;
  content: string;
  buttons: Array<{ text: string; onClick: () => void }>;
}

const MyDialog: React.FC<Props> = ({ open, handleDialogClose, title, content, buttons }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={TransitionComponentForDialog}
      keepMounted
      onClose={handleDialogClose}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'>
      <DialogTitle style={{ color: "var(--darkergray)" }} id='alert-dialog-slide-title'>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttons.map((button, index) => (
          <Button key={index} onClick={button.onClick} color='primary'>
            {button.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
