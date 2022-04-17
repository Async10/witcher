import { geheZuVorherigerRunde } from "../../domain/spieleverwaltung";
import { Uno } from "../../domain/uno";
import { useSpieleverwaltungStorage } from "../../services/adapters";
import { SpieleverwaltungStorageService } from "../ports";

export function useGeheZuVorherigerRunde() {
  const storage: SpieleverwaltungStorageService = useSpieleverwaltungStorage();

  function _geheZuVorherigerRunde(spiel: Uno) {
    const { spieleverwaltung } = storage;
    const aktualisiert = geheZuVorherigerRunde(spieleverwaltung, spiel);
    storage.aktualisiereSpieleverwaltung(aktualisiert);
  }

  return { geheZuVorherigerRunde: _geheZuVorherigerRunde };
}
