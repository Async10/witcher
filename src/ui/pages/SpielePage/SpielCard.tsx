import blue from "@mui/material/colors/blue";
import Typography from "@mui/material/Typography";
import React from "react";
import { Siegerehrung } from "../../../domain/siegerehrungen";
import { Uno } from "../../../domain/uno";
import LinkCard from "./LinkCard";

export type SpielCardProps =
  | { spiel: Uno; type: "spiel" }
  | { siegerehrung: Siegerehrung; type: "siegerehrung" };

export default function SpielCard(props: SpielCardProps) {
  return props.type === "siegerehrung" ? (
    <LinkCard
      to={`siegerehrungen/${props.siegerehrung.id}`}
      aria-label={`Zur ${props.siegerehrung.titel}`}
    >
      <Typography sx={{ fontsize: 14 }} color="text.secondary">
        Zur Siegerehrung
      </Typography>
      <Typography variant="h6" component="div">
        {props.siegerehrung.titel}
      </Typography>
      <Typography sx={{ mt: 0.5 }} variant="body2" color="text.secondary">
        {`🥇 ${props.siegerehrung.endstand[0].spieler}`}
        {`, 🥈 ${props.siegerehrung.endstand[1].spieler}`}
        {props.siegerehrung.endstand[2]?.spieler &&
          `, 🥉 ${props.siegerehrung.endstand[2].spieler}`}
        {props.siegerehrung.endstand[3]?.spieler && ", ..."}
      </Typography>
    </LinkCard>
  ) : (
    <LinkCard
      to={`/uno/${props.spiel.id}`}
      aria-label={`Das Spiel ${props.spiel.titel} fortsetzen`}
      color={blue[800]}
    >
      <Typography sx={{ fontsize: 14 }} color="text.secondary">
        Fortsetzen
      </Typography>

      <Typography variant="h6" component="div">
        {props.spiel.titel}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        mit {props.spiel.spieler.slice(0, -1).join(", ")} und{" "}
        {props.spiel.spieler.slice(-1)}
      </Typography>
    </LinkCard>
  );
}
