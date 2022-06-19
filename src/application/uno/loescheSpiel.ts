import { loescheSpiel } from "../../domain/spieleverwaltung";
import { useSpieleverwaltungStorage } from "../../services/adapters";
import { SpieleverwaltungStorageService } from "../ports";

export function useLoescheSpiel() {
  const storage: SpieleverwaltungStorageService = useSpieleverwaltungStorage();

  function _loescheSpiel(unoId: UniqueId) {
    const { spieleverwaltung } = storage;
    const aktualisiert = loescheSpiel(spieleverwaltung, unoId);
    storage.aktualisiereSpieleverwaltung(aktualisiert);
  }

  return { loescheSpiel: _loescheSpiel };
}
