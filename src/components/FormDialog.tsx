import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { TransitionComponentForDialog } from "./MyDialog";

interface Props {
  open: boolean;
  handleDialogClose: () => void;
  title: string;
  content?: string;
  hasTextField?: boolean;
  textFieldLabel?: string;
  textFieldInitalValue?: string;
  buttons?: Array<{
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: string) => void;
    disabledIf?: (value: string) => boolean;
  }>;
}

const FormDialog: React.FC<Props> = ({
  open,
  handleDialogClose,
  title,
  content,
  hasTextField = false,
  textFieldLabel = "",
  textFieldInitalValue = "",
  buttons = [],
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(textFieldInitalValue);
  useEffect(() => {
    setValue(textFieldInitalValue);
  }, [textFieldInitalValue]);
  return (
    <Dialog
      open={open}
      TransitionComponent={TransitionComponentForDialog}
      keepMounted
      onClose={() => {
        setValue(textFieldInitalValue);
        handleDialogClose();
      }}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'>
      <DialogTitle style={{ color: "var(--darkergray)" }} id='alert-dialog-slide-title'>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>{content}</DialogContentText>
        {hasTextField && (
          <TextField
            autoFocus
            margin='dense'
            id={textFieldLabel}
            label={textFieldLabel}
            className={classes.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          />
        )}
      </DialogContent>
      <DialogActions>
        {buttons.map((button, index) => (
          <Button
            key={index}
            onClick={(e) => button.onClick(e, value)}
            color='primary'
            disabled={button.disabledIf?.(value)}>
            {button.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    input: { color: "blue" },
  };
});

export default FormDialog;
