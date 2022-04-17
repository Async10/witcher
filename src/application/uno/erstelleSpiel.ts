import { Spieler } from "../../domain/shared";
import { erstelleSpiel } from "../../domain/spieleverwaltung";
import { Uno } from "../../domain/uno";
import { useSpieleverwaltungStorage } from "../../services/adapters";
import { SpieleverwaltungStorageService } from "../ports";

export function useErstelleSpiel() {
  const storage: SpieleverwaltungStorageService = useSpieleverwaltungStorage();

  function _erstelleSpiel(spieler: Spieler[]): Result<Uno> {
    const { spieleverwaltung } = storage;
    const result = erstelleSpiel(spieleverwaltung, spieler);
    if (!result.success) {
      return result;
    }

    const [aktualisiert, spiel] = result.value;
    storage.aktualisiereSpieleverwaltung(aktualisiert);
    return { success: true, value: spiel };
  }

  return { erstelleSpiel: _erstelleSpiel };
}
