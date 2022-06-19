import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText, {
  DialogContentTextProps,
} from "@mui/material/DialogContentText";
import DialogTitle, { DialogTitleProps } from "@mui/material/DialogTitle";

export type JaNeinDialogProps = {
  open: DialogProps["open"];
  title: DialogTitleProps["children"];
  text: DialogContentTextProps["children"];
  onJa: () => void;
  onNein: () => void;
};

export default function JaNeinDialog(props: JaNeinDialogProps) {
  return (
    <Dialog open={props.open}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.text}</DialogContentText>
        <DialogActions>
          <Button size="small" onClick={props.onJa}>
            Nein
          </Button>
          <Button size="small" onClick={props.onNein}>
            Ja
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
