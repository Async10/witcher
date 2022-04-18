import ArrowBackIosOutlined from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlined from "@mui/icons-material/ArrowForwardIosOutlined";
import EmojiEventsOutlined from "@mui/icons-material/EmojiEventsOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAenderePunkte,
  useBeendeSpiel,
  useGeheZuNaechsterRunde,
  useGeheZuVorherigerRunde,
} from "../../application/uno";
import { useAktualisiereSpielstand } from "../../application/uno/aktualisiereSpielstand";
import { Rundennummer } from "../../domain/rundennummer";
import { Spieler } from "../../domain/spielerliste";
import { Spieleverwaltung } from "../../domain/spieleverwaltung";
import { Auswertung } from "../../domain/spielstand";
import * as uno from "../../domain/uno";
import { useSpieleverwaltungStorage } from "../../services/adapters";

function selectSpiel(
  spieleverwaltung: Spieleverwaltung,
  id: UniqueId
): uno.Uno {
  return spieleverwaltung.uno[id];
}

function selectAktuelleRunde(
  spiel: uno.Uno,
  rundennummer: Rundennummer
): uno.Runde {
  return spiel.runden[rundennummer];
}

function selectAuswertung(spiel: uno.Uno, spieler: Spieler): Auswertung {
  return spiel.spielstand.find((s) => s.spieler === spieler)!;
}

export default function Uno() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const { spieleverwaltung } = useSpieleverwaltungStorage();
  const spiel = selectSpiel(spieleverwaltung, params.id!);
  const { rundennummer, titel, spieler } = spiel;
  const aktuelleRunde = selectAktuelleRunde(spiel, rundennummer);

  const { aenderePunkte } = useAenderePunkte();
  const { beendeSpiel } = useBeendeSpiel();
  const { geheZuNaechsterRunde } = useGeheZuNaechsterRunde();
  const { geheZuVorherigerRunde } = useGeheZuVorherigerRunde();
  const { aktualisiereSpielstand } = useAktualisiereSpielstand();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [rundennummer]);

  const handleWeiterClick = () => {
    geheZuNaechsterRunde(spiel);
  };

  const handleZurueckClick = () => {
    geheZuVorherigerRunde(spiel);
  };

  const handleBeendeSpielClick = () => {
    setDialogOpen(true);
  };

  const handleBeendeSpielJaClick = () => {
    const siegerehrung = beendeSpiel(spiel);
    navigate(`/siegerehrungen/${siegerehrung.id}`, { replace: true });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handlePunkteChange =
    (spieler: Spieler) =>
    (ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = ev.target.value;
      const punkte = value === "" ? 0 : parseInt(value, 10);
      if (isNaN(punkte)) {
        throw new Error(
          "Punkte müssen eine Ganzzahl größer oder gleich 0 sein"
        );
      }

      aenderePunkte(spiel, spieler, punkte);
    };

  const handlePunkteBlur = (
    ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    aktualisiereSpielstand(spiel);
  };

  const handlePunkteFocus = (
    ev: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    ev.target.select();
  };

  const renderAuswertung = (spieler: Spieler) => {
    const auswertung = selectAuswertung(spiel, spieler);
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        sx={{ gap: 2, mb: 2 }}
      >
        <Typography variant="h6" component="h3">
          {auswertung.spieler}
        </Typography>
        <Typography variant="body1">{`Platz ${auswertung.platz} mit ${auswertung.punkte} Punkten`}</Typography>
      </Box>
    );
  };

  return (
    <>
      <Container sx={{ mb: 10 }} maxWidth="sm">
        <Box sx={{ my: 2 }}>
          <Typography color="primary" variant="h5" component="h1" gutterBottom>
            {titel}
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            Runde {rundennummer}
          </Typography>

          {spieler.map((s) => (
            <Paper component="article" key={s} sx={{ my: 2, p: 2 }}>
              {renderAuswertung(s)}
              <TextField
                type="number"
                name={s}
                label="Punkte"
                value={aktuelleRunde[s]}
                onChange={handlePunkteChange(s)}
                onBlur={handlePunkteBlur}
                onFocus={handlePunkteFocus}
                fullWidth
                margin="none"
                variant="filled"
                inputProps={{
                  min: 0,
                  step: 10,
                }}
              />
            </Paper>
          ))}
        </Box>
      </Container>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              visibility: uno.hatVorherigeRunde(spiel) ? "visible" : "hidden",
            }}
          >
            <IconButton onClick={handleZurueckClick} aria-labelledby="zurueck">
              <ArrowBackIosOutlined />
            </IconButton>
            <Typography id="zurueck" variant="caption">
              Vorherige Runde
            </Typography>
          </Box>
          <Fab
            color="primary"
            sx={{
              mx: "auto",
              transform: "translateY(-50%)",
            }}
            aria-labelledby="siegerehrung"
            onClick={handleBeendeSpielClick}
          >
            <EmojiEventsOutlined />
          </Fab>
          <Typography
            id="siegerehrung"
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
            }}
            variant="caption"
          >
            Spiel beenden
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "column",
            }}
          >
            <IconButton onClick={handleWeiterClick} aria-labelledby="weiter">
              <ArrowForwardIosOutlined />
            </IconButton>
            <Typography id="weiter" variant="caption">
              Nächste Runde
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog open={dialogOpen}>
        <DialogTitle>Spiel beenden?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wollt ihr das Spiel beenden und die Siegerehrung durchführen?
          </DialogContentText>
          <DialogActions>
            <Button size="small" onClick={handleDialogClose}>
              Nein
            </Button>
            <Button size="small" onClick={handleBeendeSpielJaClick}>
              Ja
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
