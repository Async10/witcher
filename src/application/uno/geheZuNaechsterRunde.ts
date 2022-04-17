import { geheZuNaechsterRunde } from "../../domain/spieleverwaltung";
import { Uno } from "../../domain/uno";
import { useSpieleverwaltungStorage } from "../../services/adapters";
import { SpieleverwaltungStorageService } from "../ports";

export function useGeheZuNaechsterRunde() {
  const storage: SpieleverwaltungStorageService = useSpieleverwaltungStorage();

  function _geheZuNaechsterRunde(spiel: Uno) {
    const { spieleverwaltung } = storage;
    const aktualisiert = geheZuNaechsterRunde(spieleverwaltung, spiel);
    storage.aktualisiereSpieleverwaltung(aktualisiert);
  }

  return { geheZuNaechsterRunde: _geheZuNaechsterRunde };
}
