import AddOutlined from "@mui/icons-material/AddOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import React from "react";
import {
  useSpielerHinzufuegen,
  useSpielerLoeschen,
} from "../../../application/spieler";
import { useSpielerlisteStorage } from "../../../services/adapters";

export default function SpielerPage() {
  const { spielerliste } = useSpielerlisteStorage();

  const { spielerHinzufuegen } = useSpielerHinzufuegen();
  const { spielerLoeschen } = useSpielerLoeschen();

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [spielerZumLoeschen, setSpielerZumLoeschen] = React.useState<
    string | null
  >(null);
  const dialogOpen = spielerZumLoeschen !== null;

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!inputRef.current) return;

    const result = spielerHinzufuegen(inputRef.current?.value ?? "");
    if (result.success) {
      inputRef.current.value = "";
      return;
    }

    alert(result.error);
  };

  const handleSpielerLoeschenClick = (spieler: string) => () =>
    setSpielerZumLoeschen(spieler);

  const handleSpielerLoeschenNeinClick = () => setSpielerZumLoeschen(null);

  const handleSpielerLoeschenJaClick = () => {
    spielerLoeschen(spielerZumLoeschen!);
    setSpielerZumLoeschen(null);
  };

  return (
    <>
      <Paper
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          "&:focus-within": { boxShadow: 3 },
        }}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <InputBase
          placeholder="Spieler hinzufügen"
          inputRef={inputRef}
          sx={{
            flex: 1,
            pl: 1,
          }}
          inputProps={{
            "aria-label": "Spieler hinzufügen",
          }}
        />
        <IconButton type="submit">
          <AddOutlined />
        </IconButton>
      </Paper>

      {!!spielerliste.length && (
        <Paper sx={{ mt: 2 }} component={List}>
          {spielerliste.map((spieler, index) => (
            <React.Fragment key={spieler}>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="Spieler löschen"
                    onClick={handleSpielerLoeschenClick(spieler)}
                  >
                    <DeleteOutlined color="error" />
                  </IconButton>
                }
              >
                <ListItemText primary={spieler} />
              </ListItem>
              {index < spielerliste.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Paper>
      )}

      <Dialog open={dialogOpen}>
        <DialogTitle>Spieler löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Soll der Spieler ${spielerZumLoeschen} wirklich gelöscht werden?`}
          </DialogContentText>
          <DialogActions>
            <Button size="small" onClick={handleSpielerLoeschenNeinClick}>
              Nein
            </Button>
            <Button size="small" onClick={handleSpielerLoeschenJaClick}>
              Ja
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
