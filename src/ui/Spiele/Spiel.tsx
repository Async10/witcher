import blue from "@mui/material/colors/blue";
import Typography from "@mui/material/Typography";
import React from "react";
import { istBeendet, Uno } from "../../domain/uno";
import LinkCard from "./LinkCard";

export type SpielProps = {
  spiel: Uno;
};

export default function Spiel({ spiel }: SpielProps) {
  return istBeendet(spiel) ? (
    <LinkCard
      to={`siegerehrungen/${spiel.siegerehrungId}`}
      aria-label={`Die Siegerehrung für das Spiel ${spiel.titel} anschauen`}
    >
      <Typography sx={{ fontsize: 14 }} color="text.secondary">
        Zur Siegerehrung
      </Typography>
      <Typography variant="h6" component="div">
        {spiel.titel}
      </Typography>
      <Typography sx={{ mt: 0.5 }} variant="body2" color="text.secondary">
        {`🥇 ${spiel.spielstand[0].spieler}`}
        {`, 🥈 ${spiel.spielstand[1].spieler}`}
        {spiel.spielstand[2]?.spieler && `, 🥉 ${spiel.spielstand[2].spieler}`}
        {spiel.spielstand[3]?.spieler && ", ..."}
      </Typography>
    </LinkCard>
  ) : (
    <LinkCard
      to={`/uno/${spiel.id}`}
      aria-label={`Das Spiel ${spiel.titel} fortsetzen`}
      color={blue[800]}
    >
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
    </LinkCard>
  );
}
