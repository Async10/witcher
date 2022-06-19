import AddOutlined from "@mui/icons-material/AddOutlined";
import Fab from "@mui/material/Fab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Siegerehrung, Siegerehrungen } from "../../domain/siegerehrungen";
import { Spieleverwaltung } from "../../domain/spieleverwaltung";
import { Uno } from "../../domain/uno";
import {
  useSiegerehrungenStorage,
  useSpieleverwaltungStorage,
} from "../../services/adapters";
import ErstelleSpielDialog, { ErstelltesSpiel } from "./ErstelleSpielDialog";
import SpielCard, { SpielCardProps } from "./SpielCard";

function selectSpiele(
  spieleverwaltung: Spieleverwaltung,
  siegerehrungen: Siegerehrungen
): SpielCardProps[] {
  return orderByCreatedDesc([
    ...Object.values(spieleverwaltung.uno),
    ...Object.values(siegerehrungen),
  ]).map(toSpielCardProps);
}

function toSpielCardProps(spiel: Uno | Siegerehrung): SpielCardProps {
  return isSiegerehrung(spiel)
    ? { type: "siegerehrung", siegerehrung: spiel }
    : { type: "spiel", spiel };
}

function orderByCreatedDesc(spiele: Array<Uno | Siegerehrung>) {
  return [...spiele].sort((a, b) => {
    const createdA = getCreated(a);
    const createdB = getCreated(b);
    return createdB - createdA;
  });
}

function getCreated(spiel: Uno | Siegerehrung) {
  if (isSiegerehrung(spiel)) {
    return spiel.spielCreated ?? 0;
  }

  return spiel.created;
}

function isSiegerehrung(spiel: Uno | Siegerehrung): spiel is Siegerehrung {
  return "endstand" in spiel;
}

function getId(spiel: SpielCardProps) {
  return spiel.type === "spiel" ? spiel.spiel.id : spiel.siegerehrung.id;
}

export default function SpielePage() {
  const navigate = useNavigate();
  const { spieleverwaltung } = useSpieleverwaltungStorage();
  const { siegerehrungen } = useSiegerehrungenStorage();
  const spiele = selectSpiele(spieleverwaltung, siegerehrungen);
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
          <SpielCard key={getId(spiel)} {...spiel} />
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
