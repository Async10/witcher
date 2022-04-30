import AddOutlined from "@mui/icons-material/AddOutlined";
import Fab from "@mui/material/Fab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Spieleverwaltung } from "../../domain/spieleverwaltung";
import { Uno } from "../../domain/uno";
import { useSpieleverwaltungStorage } from "../../services/adapters";
import ErstelleSpielDialog, { ErstelltesSpiel } from "./ErstelleSpielDialog";
import Spiel from "./Spiel";

function selectSpiele(spieleverwaltung: Spieleverwaltung): Uno[] {
  return Object.values(spieleverwaltung.uno).sort(
    (spielA, spielB) => spielB.created - spielA.created
  );
}

export default function Spiele() {
  const navigate = useNavigate();
  const { spieleverwaltung } = useSpieleverwaltungStorage();
  const spiele = selectSpiele(spieleverwaltung);
  const [erstelleSpielDialogOpen, setErstelleSpielDialogOpen] =
    React.useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);

  const handleErstelleSpielClick = (
    ev: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUNOClick = () => {
    setAnchorEl(null);
    setErstelleSpielDialogOpen(true);
  };

  const handleWizardClick = () => {
    setAnchorEl(null);
    alert("Sorry. Wizard kann noch nicht gespielt werden.");
  };

  const handleWitchesClick = () => {
    setAnchorEl(null);
    alert("Sorry. Witches kann noch nicht gespielt werden.");
  };

  const handleSpielStarten = ({ id }: ErstelltesSpiel) => {
    navigate(`/uno/${id}`);
  };

  const handleAbbrechen = () => {
    setErstelleSpielDialogOpen(false);
  };

  return (
    <>
      <Stack spacing={2}>
        {spiele.map((spiel) => (
          <Spiel key={spiel.id} spiel={spiel} />
        ))}
      </Stack>

      <Fab
        id="spiel-erstellen-menu-open-button"
        onClick={handleErstelleSpielClick}
        aria-label={`"Spiel erstellen"-Menü öffnen`}
        aria-controls={menuOpen ? "spiel-erstellen-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        sx={{ position: "fixed", bottom: 0, right: 0, mb: 10, mr: 2 }}
      >
        <AddOutlined />
      </Fab>

      <Menu
        id="spiel-erstellen-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "spiel-erstellen-menu-open-button",
        }}
      >
        <MenuItem
          arial-label="Neues UNO-Spiel starten"
          onClick={handleUNOClick}
        >
          UNO
        </MenuItem>
        <MenuItem
          aria-label="Neues Wizard-Spiel starten"
          onClick={handleWizardClick}
        >
          Wizard
        </MenuItem>
        <MenuItem
          aria-label="Neues Witches-Spiel starten"
          onClick={handleWitchesClick}
        >
          Witches
        </MenuItem>
      </Menu>

      <ErstelleSpielDialog
        open={erstelleSpielDialogOpen}
        onAbbrechen={handleAbbrechen}
        onSpielStarten={handleSpielStarten}
      />
    </>
  );
}
