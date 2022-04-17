import AddOutlined from "@mui/icons-material/AddOutlined";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useErstelleSpiel } from "../../application/uno";
import { Spieleverwaltung } from "../../domain/spieleverwaltung";
import { Uno } from "../../domain/uno";
import { useSpieleverwaltungStorage } from "../../services/adapters";
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

  const { erstelleSpiel } = useErstelleSpiel();

  const handleErstelleSpielClick = () => {
    const result = erstelleSpiel(["Daniel", "Alisi", "Philipp"]);
    if (!result.success) {
      alert(result.error);
      return;
    }

    navigate(`/uno/${result.value.id}`);
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
        aria-label="Neues Spiel"
        sx={{ position: "absolute", bottom: 0, right: 0, mb: 11, mr: 4 }}
      >
        <AddOutlined />
      </Fab>
    </>
  );
}
