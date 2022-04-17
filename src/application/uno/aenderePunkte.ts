import { Punkte } from "../../domain/punkte";
import { Spieler } from "../../domain/spielerliste";
import { aenderePunkte } from "../../domain/spieleverwaltung";
import { Uno } from "../../domain/uno";
import { useSpieleverwaltungStorage } from "../../services/adapters";
import { SpieleverwaltungStorageService } from "../ports";

export function useAenderePunkte() {
  const storage: SpieleverwaltungStorageService = useSpieleverwaltungStorage();

  function _aenderePunkte(spiel: Uno, spieler: Spieler, punkte: Punkte) {
    const { spieleverwaltung } = storage;
    const aktualisiert = aenderePunkte(spieleverwaltung, spiel, spieler, punkte);
    storage.aktualisiereSpieleverwaltung(aktualisiert);
  }

  return { aenderePunkte: _aenderePunkte };
}
