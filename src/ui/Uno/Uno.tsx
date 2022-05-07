import ArrowBackIosOutlined from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
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
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  useAenderePunkte,
  useBeendeSpiel,
  useGeheZuNaechsterRunde,
  useGeheZuVorherigerRunde,
} from "../../application/uno";
import { useAktualisiereSpielstand } from "../../application/uno/aktualisiereSpielstand";
import { Rundennummer } from "../../domain/rundennummer";
import { Spieler } from "../../domain/spielerliste";
import { Platzierung } from "../../domain/spielstand";
import * as uno from "../../domain/uno";

function selectAktuelleRunde(
  spiel: uno.Uno,
  rundennummer: Rundennummer
): uno.Runde {
  return spiel.runden[rundennummer];
}

function selectAuswertung(spiel: uno.Uno, spieler: Spieler): Platzierung {
  return spiel.spielstand.find((s) => s.spieler === spieler)!;
}

export type UnoProps = {
  spiel: uno.Uno;
};

export default function Uno({ spiel }: UnoProps) {
  const { rundennummer, titel, spieler } = spiel;
  const aktuelleRunde = selectAktuelleRunde(spiel, rundennummer);

  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const navigate = useNavigate();

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
    const { siegerehrungId } = beendeSpiel(spiel);
    navigate(`/siegerehrungen/${siegerehrungId}`, { replace: true });
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

  function renderAuswertung(spieler: Spieler) {
    const auswertung = selectAuswertung(spiel, spieler);
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        sx={{ gap: 2, mb: 1 }}
      >
        <Typography variant="h6" component="h3">
          {auswertung.spieler}
        </Typography>
        <Typography variant="body1">{`Platz ${auswertung.platz} mit ${auswertung.punkte} Punkten`}</Typography>
      </Box>
    );
  }

  return (
    <>
      <AppBar color="transparent" position="sticky" sx={{ top: 0, left: 0 }}>
        <Toolbar sx={{ flexWrap: "wrap", py: 1 }}>
          <IconButton
            edge="start"
            title="Zurück zur Spieleübersicht"
            component={RouterLink}
            to="/"
          >
            <ArrowBackOutlined />
          </IconButton>
          <Typography variant="h6" component="h1">
            {titel}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }} maxWidth="sm">
        <Typography color="primary.light" variant="h6" component="h2">
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
      </Container>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          left: 0,
          bottom: 0,
        }}
        elevation={3}
        component="footer"
      >
        <Toolbar sx={{ py: 0.5 }}>
          <Stack alignItems="center">
            <IconButton onClick={handleZurueckClick} aria-labelledby="zurueck">
              <ArrowBackIosOutlined />
            </IconButton>
            <Typography id="zurueck" variant="caption">
              Vorherige Runde
            </Typography>
          </Stack>
          <Fab
            color="primary"
            sx={{
              mx: "auto",
              transform: "translateY(-50%)",
              mt: -1,
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
              top: "auto",
              transform: "translateX(-50%)",
              pb: 0.5,
            }}
            component="div"
            variant="caption"
          >
            Spiel beenden
          </Typography>
          <Stack alignItems="center">
            <IconButton onClick={handleWeiterClick} aria-labelledby="weiter">
              <ArrowForwardIosOutlined />
            </IconButton>
            <Typography id="weiter" variant="caption">
              Nächste Runde
            </Typography>
          </Stack>
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