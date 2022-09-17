import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Platzierung, Spielstand } from "../../../domain/spielstand";

export type PlatzierungenProps = {
  endstand: Spielstand;
};

export default function Platzierungen({ endstand }: PlatzierungenProps) {
  const renderPlatzierung = ({ platz, spieler, punkte }: Platzierung) => {
    const _renderPlatzierung = (
      platzString: string,
      istPodiumsplatz: boolean
    ) => (
      <Typography variant="h6">
        <span
          style={
            istPodiumsplatz
              ? { display: "inline-block", marginLeft: "-6px" }
              : {}
          }
        >
          {platzString}
        </span>
        &nbsp;
        {`${spieler} mit ${punkte} Punkten`}
      </Typography>
    );

    const platzString = { 1: "🥇", 2: "🥈", 3: "🥉" }[platz] ?? `${platz}.`;
    const istPodiumsplatz = 1 <= platz && platz <= 3;
    return _renderPlatzierung(platzString, istPodiumsplatz);
  };

  return (
    <List component="ol" aria-label="Platzierungen">
      {endstand.map((auswertung, idx) => (
        <ListItem key={idx}>
          <ListItemText primary={renderPlatzierung(auswertung)} />
        </ListItem>
      ))}
    </List>
  );
}
