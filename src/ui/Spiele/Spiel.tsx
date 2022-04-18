import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { istBeendet, Uno } from "../../domain/uno";

type SpielProps = {
  spiel: Uno;
};

function Fortsetzen({ spiel }: SpielProps) {
  return (
    <Card sx={{ backgroundColor: "primary.dark" }}>
      <CardActionArea
        component={RouterLink}
        to={`/uno/${spiel.id}`}
        aria-label={`Das Spiel ${spiel.titel} fortsetzen`}
      >
        <CardContent>
          <Typography sx={{ fontsize: 14 }} color="text.secondary">
            Fortsetzen
          </Typography>

          <Typography variant="h6" component="div">
            {spiel.titel}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            mit {spiel.spieler.slice(0, -1).join(", ")} und{" "}
            {spiel.spieler.slice(-1)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function ZurSiegerehrung({ spiel }: SpielProps) {
  return (
    <Card>
      <CardActionArea
        component={RouterLink}
        to={`siegerehrungen/${spiel.siegerehrungId}`}
        aria-label={`Die Siegerehrung für das Spiel ${spiel.titel} anschauen`}
      >
        <CardContent>
          <Typography sx={{ fontsize: 14 }} color="text.secondary">
            Zur Siegerehrung
          </Typography>
          <Typography variant="h6" component="div">
            {spiel.titel}
          </Typography>
          <Typography sx={{ mt: 0.5 }} variant="body2" color="text.secondary">
            {`🥇 ${spiel.spielstand[0].spieler}`}
            {`, 🥈 ${spiel.spielstand[1].spieler}`}
            {spiel.spielstand[2]?.spieler &&
              `, 🥉 ${spiel.spielstand[2].spieler}`}
            {spiel.spielstand[3]?.spieler && ", ..."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function Spiel({ spiel }: SpielProps) {
  return istBeendet(spiel) ? (
    <ZurSiegerehrung spiel={spiel} />
  ) : (
    <Fortsetzen spiel={spiel} />
  );
}
