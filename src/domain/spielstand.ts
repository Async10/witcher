import { Platz } from "./platz";
import { Punkte } from "./punkte";
import { Spieler } from "./spielerliste";

export type Auswertung = { spieler: Spieler, punkte: Punkte, platz: Platz; };

export type Spielstand = Auswertung[];
