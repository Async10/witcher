import { Punkte } from "./punkte";
import { Rundennummer } from "./rundennummer";
import { Siegerehrung } from "./siegerehrung";
import { Spieler } from "./spielerliste";
import { Spielstand } from "./spielstand";

const RUNDEN_START = 1;

const MIN_ANZAHL_SPIELER = 2;
const MAX_ANZAHL_SPIELER = 10;

export type Uno = {
  id: UniqueId;
  titel: string;
  created: Timestamp;
  rundennummer: Rundennummer;
  runden: Runden;
  spieler: Spieler[];
  spielstand: Spielstand;
  siegerehrungId?: UniqueId;
};

export type Runden = {
  [nummer: Rundennummer]: Runde;
};

export type Runde = {
  [spieler: Spieler]: Punkte;
};

function erstelleRunde(spieler: Spieler[]): Runde {
  return spieler.reduce((r, s) => ({ ...r, [s]: 0 }), {});
}

export function istBeendet(spiel: Uno) {
  return !!spiel.siegerehrungId;
}

export function erstelleSpiel(spieler: Spieler[]): Result<Uno> {
  const messages = validateErstelleSpiel(spieler);
  if (messages.length) {
    return {
      success: false,
      error: messages.join(" "),
    };
  }

  const runden = {
    [RUNDEN_START]: erstelleRunde(spieler),
  };

  const spiel = {
    created: Date.now(),
    get id() {
      return this.created.toString();
    },
    get titel() {
      return `UNO, ${new Date(this.created).toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric"
      })}`;
    },
    rundennummer: RUNDEN_START,
    runden,
    spieler,
    spielstand: berechneSpielstand(runden)
  };
  return { success: true, value: spiel };
}

export function kannSpielErstellen(spieler: Spieler[]) {
  return !validateErstelleSpiel(spieler).length;
}

function validateErstelleSpiel(spieler: Spieler[]): string[] {
  const messages = [];

  if (spieler.length < MIN_ANZAHL_SPIELER)
    messages.push(`Die Mindestanzahl der Spieler beträgt ${MIN_ANZAHL_SPIELER}.`);

  if (spieler.length > MAX_ANZAHL_SPIELER)
    messages.push(`Die Maximalanzahl der Spieler beträgt ${MAX_ANZAHL_SPIELER}.`);

  return messages;
}

function spieler(spiel: Uno) {
  return spiel.spielstand.map(s => s.spieler);
}

export function geheZuNaechsterRunde(spiel: Uno): Uno {
  const rundennummer = spiel.rundennummer + 1;
  const naechsteRunde = spiel.runden[rundennummer] ?? erstelleRunde(spieler(spiel));
  return {
    ...spiel,
    rundennummer,
    runden: {
      ...spiel.runden,
      [rundennummer]: naechsteRunde,
    }
  };
}

export function hatVorherigeRunde(spiel: Uno) {
  return spiel.rundennummer > RUNDEN_START;
}

export function geheZuVorherigerRunde(spiel: Uno): Uno {
  if (spiel.rundennummer <= RUNDEN_START) return spiel;
  return {
    ...spiel,
    rundennummer: spiel.rundennummer - 1,
  };
}

export function aenderePunkte(spiel: Uno, spieler: Spieler, punkte: Punkte): Uno {
  return {
    ...spiel,
    runden: {
      ...spiel.runden,
      [spiel.rundennummer]: {
        ...spiel.runden[spiel.rundennummer],
        [spieler]: Math.max(punkte, 0),
      }
    }
  };
}

export function aktualisiereSpielstand(spiel: Uno): Uno {
  return {
    ...spiel,
    spielstand: berechneSpielstand(spiel.runden)
  };
}

function berechneSpielstand(runden: Runden): Spielstand {
  const tmp = Object.values(runden).reduce((endstand, runde) => {
    return Object.entries(runde).reduce((runde, [spieler, punkte]) => {
      return {
        ...runde,
        [spieler]: runde[spieler] + punkte,
      };
    }, endstand);
  });

  return Object.entries(tmp)
    .map(([spieler, punkte]) => ({ spieler, punkte }))
    .sort((a, b) => a.punkte - b.punkte)
    .map((s, i) => ({ ...s, platz: i + 1 }));
}

export function beendeSpiel(spiel: Uno, siegerehrung: Siegerehrung): Uno {
  return {
    ...spiel,
    siegerehrungId: siegerehrung.id,
  };
}
