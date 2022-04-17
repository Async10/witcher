import { aktualisiereSpielstand } from "../../domain/spieleverwaltung";
import { Uno } from "../../domain/uno";
import { useSpieleverwaltungStorage } from "../../services/adapters";
import { SpieleverwaltungStorageService } from "../ports";

export function useAktualisiereSpielstand() {
  const storage: SpieleverwaltungStorageService = useSpieleverwaltungStorage();

  function _aktualisiereSpielstand(spiel: Uno) {
    const { spieleverwaltung } = storage;
    const aktualisiert = aktualisiereSpielstand(spieleverwaltung, spiel);
    storage.aktualisiereSpieleverwaltung(aktualisiert);
  }

  return {
    aktualisiereSpielstand: _aktualisiereSpielstand
  };
}
