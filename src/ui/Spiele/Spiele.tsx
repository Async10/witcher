import AddOutlined from "@mui/icons-material/AddOutlined";
import Fab from "@mui/material/Fab";
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

  const handleErstelleSpielClick = () => {
    setErstelleSpielDialogOpen(true);
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
        onClick={handleErstelleSpielClick}
        aria-label="Neues Spiel beginnen"
        sx={{ position: "fixed", bottom: 0, right: 0, mb: 10, mr: 2 }}
      >
        <AddOutlined />
      </Fab>

      <ErstelleSpielDialog
        open={erstelleSpielDialogOpen}
        onAbbrechen={handleAbbrechen}
        onSpielStarten={handleSpielStarten}
      />
    </>
  );
}
