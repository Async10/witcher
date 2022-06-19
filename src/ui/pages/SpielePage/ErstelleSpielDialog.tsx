import { ArrowBackOutlined } from "@mui/icons-material";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlined from "@mui/icons-material/KeyboardArrowUpOutlined";
import Autocomplete, {
  AutocompleteChangeReason,
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import React from "react";
import { useErstelleSpiel } from "../../../application/uno";
import { Spieler } from "../../../domain/spielerliste";
import { kannSpielErstellen } from "../../../domain/uno";
import { useSpielerlisteStorage } from "../../../services/adapters";

export type ErstelltesSpiel = {
  id: UniqueId;
};

export type ErstelleSpielDialogProps = {
  open: boolean;
  onSpielStarten: (spiel: ErstelltesSpiel) => void;
  onAbbrechen: () => void;
};

export default function ErstelleSpielDialog({
  open,
  onSpielStarten,
  onAbbrechen,
}: ErstelleSpielDialogProps) {
  const { spielerliste } = useSpielerlisteStorage();
  const [ausgewaehlteSpieler, setAusgewaehlteSpieler] = React.useState<
    Spieler[]
  >([]);
  const [value, setValue] = React.useState<Spieler | null>(null);
  const [active, setActive] = React.useState<Spieler | null>(null);
  const handleRef = React.useRef<number | null>(null);

  const filterOptions = (options: Spieler[]) =>
    options.filter((option) => !ausgewaehlteSpieler.includes(option));

  const { erstelleSpiel } = useErstelleSpiel();

  React.useEffect(() => {
    const cleanUp = () => {
      if (handleRef.current) {
        window.clearTimeout(handleRef.current);
      }
    };

    cleanUp();
    handleRef.current = window.setTimeout(() => setActive(null), 3000);
    return cleanUp;
  }, [active]);

  const handleSpielerAusAuswahlEntfernenClick = (spieler: Spieler) => () => {
    setAusgewaehlteSpieler((prev) => prev.filter((s) => s !== spieler));
  };

  const umsortieren = (src: Spieler[], from: number, to: number) => {
    const tmp = [...src];
    if (from < 0 || from >= tmp.length) {
      return tmp;
    }

    const item = tmp.splice(from, 1)[0];
    tmp.splice(Math.max(to, 0), 0, item);
    return tmp;
  };

  const handleSpielerHochClick = (spieler: Spieler) => () => {
    setActive(spieler);
    setAusgewaehlteSpieler((prev) => {
      const from = prev.indexOf(spieler);
      const to = from - 1;
      return umsortieren(prev, from, to);
    });
  };

  const handleSpielerRunterClick = (spieler: Spieler) => () => {
    setActive(spieler);
    setAusgewaehlteSpieler((prev) => {
      const from = prev.indexOf(spieler);
      const to = from + 1;
      return umsortieren(prev, from, to);
    });
  };

  const handleChange = (
    ev: unknown,
    value: Spieler | null,
    reason: AutocompleteChangeReason
  ) => {
    setValue(value);
    if (value && reason === "selectOption") {
      setAusgewaehlteSpieler((prev) => [...prev, value]);
      setTimeout(() => setValue(null));
    }
  };

  const handleErstelleSpielClick = () => {
    const result = erstelleSpiel(ausgewaehlteSpieler);
    if (!result.success) {
      alert(result.error);
      return;
    }

    onSpielStarten({ id: result.value.id });
  };

  const handleAbbrechenClick = () => {
    setValue(null);
    setAusgewaehlteSpieler([]);
    onAbbrechen();
  };

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      margin="dense"
      variant="filled"
      label="Spieler auswählen"
    />
  );

  return (
    <Dialog open={open} fullScreen>
      <DialogTitle>
        <IconButton
          onClick={handleAbbrechenClick}
          edge="start"
          title="Spiel starten abbrechen"
        >
          <ArrowBackOutlined />
        </IconButton>
        Neues Uno Spiel starten
      </DialogTitle>

      <DialogContent>
        <DialogContentText gutterBottom>
          Bitte wählt mindestens 2 und maxmial 10 Spieler für diese Partie UNO
          aus!
        </DialogContentText>

        <Autocomplete
          value={value}
          onChange={handleChange}
          options={spielerliste}
          filterOptions={filterOptions}
          renderInput={renderInput}
          clearIcon={null}
          autoHighlight
          autoComplete
          autoSelect
          openOnFocus
        />

        <List aria-label="Ausgewählte Spieler">
          {ausgewaehlteSpieler.map((spieler, idx) => (
            <ListItem
              sx={[
                active === spieler && {
                  boxShadow: (theme) => `0 1px ${theme.palette.primary.main}`,
                  transition: "all 250ms ease-out",
                },
              ]}
              key={spieler}
              disablePadding
              secondaryAction={
                <>
                  <IconButton
                    aria-label="Spieler nach vorne sortieren"
                    onClick={handleSpielerHochClick(spieler)}
                    color="inherit"
                  >
                    <KeyboardArrowUpOutlined />
                  </IconButton>
                  <IconButton
                    aria-label="Spieler nach hinten sortieren"
                    onClick={handleSpielerRunterClick(spieler)}
                    color="inherit"
                  >
                    <KeyboardArrowDownOutlined />
                  </IconButton>
                  <IconButton
                    edge="end"
                    sx={{
                      paddingInlineEnd: 0,
                    }}
                    aria-label="Spieler aus Auswahl entfernen"
                    onClick={handleSpielerAusAuswahlEntfernenClick(spieler)}
                    color="inherit"
                  >
                    <CloseOutlined />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={`${idx + 1}. ${spieler}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={!kannSpielErstellen(ausgewaehlteSpieler)}
          onClick={handleErstelleSpielClick}
        >
          Spiel starten
        </Button>
      </DialogActions>
    </Dialog>
  );
}
