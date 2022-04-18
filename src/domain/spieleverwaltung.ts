import { Punkte } from "./punkte";
import { Siegerehrung } from "./siegerehrung";
import { Spieler } from "./spielerliste";
import * as uno from "./uno";

export type Spieleverwaltung = {
  uno: {
    [id: UniqueId]: uno.Uno;
  };
};

export function erstelleSpiel(
  verwaltung: Spieleverwaltung,
  spieler: Spieler[]
): Result<[Spieleverwaltung, uno.Uno]> {
  const result = uno.erstelleSpiel(spieler);
  if (!result.success) return result;
  return {
    success: true,
    value: [aktualisiereSpiel(verwaltung, result.value), result.value]
  };
}

export function aenderePunkte(
  verwaltung: Spieleverwaltung,
  spiel: uno.Uno,
  spieler: Spieler,
  punkte: Punkte
) {
  const aktualisiert = uno.aenderePunkte(spiel, spieler, punkte);
  return aktualisiereSpiel(verwaltung, aktualisiert);
}

export function aktualisiereSpielstand(verwaltung: Spieleverwaltung, spiel: uno.Uno) {
  const aktualisiert = uno.aktualisiereSpielstand(spiel);
  return aktualisiereSpiel(verwaltung, aktualisiert);
}

export function geheZuNaechsterRunde(verwaltung: Spieleverwaltung, spiel: uno.Uno) {
  const aktualisiert = uno.geheZuNaechsterRunde(spiel);
  return aktualisiereSpiel(verwaltung, aktualisiert);
}

export function geheZuVorherigerRunde(verwaltung: Spieleverwaltung, spiel: uno.Uno) {
  const aktualisiert = uno.geheZuVorherigerRunde(spiel);
  return aktualisiereSpiel(verwaltung, aktualisiert);
}

export function beendeSpiel(verwaltung: Spieleverwaltung, spiel: uno.Uno, siegerehrung: Siegerehrung) {
  const aktualisiert = uno.beendeSpiel(spiel, siegerehrung);
  return aktualisiereSpiel(verwaltung, aktualisiert);
}

function aktualisiereSpiel(verwaltung: Spieleverwaltung, spiel: uno.Uno): Spieleverwaltung {
  return {
    ...verwaltung,
    uno: {
      ...verwaltung.uno,
      [spiel.id]: spiel,
    }
  };
}
