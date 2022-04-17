import Add from "@mui/icons-material/Add";
import { FilledInput, FormControl, FormHelperText } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useSpielerHinzufuegen } from "../../application/spieler/spielerHinzufuegen";
import { useSpielerlisteStorage } from "../../services/adapters";

export default function Spieler() {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { spielerliste } = useSpielerlisteStorage();
  const { spielerHinzufuegen } = useSpielerHinzufuegen();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    spielerHinzufuegen(inputRef.current?.value ?? "");
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormControl fullWidth>
          <FilledInput
            placeholder="Spieler hinzufügen"
            inputRef={inputRef}
            type="text"
            startAdornment={
              <InputAdornment position="start">
                <Add />
              </InputAdornment>
            }
          />
          <FormHelperText error>Test 1234</FormHelperText>
        </FormControl>
      </form>
      <List>
        {spielerliste.map((spieler) => (
          <ListItem key={spieler}>
            <ListItemText primary={spieler} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
