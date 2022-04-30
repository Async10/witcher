import { erstelleSiegerehrung } from "../../domain/siegerehrungen";
import { beendeSpiel } from "../../domain/spieleverwaltung";
import { Uno } from "../../domain/uno";
import { useSiegerehrungenStorage, useSpieleverwaltungStorage } from "../../services/adapters";
import { SiegerehrungenStorageService, SpieleverwaltungStorageService } from "../ports";

export function useBeendeSpiel() {
  const siegerehrungenStorage: SiegerehrungenStorageService = useSiegerehrungenStorage();
  const spieleverwaltungStorage: SpieleverwaltungStorageService = useSpieleverwaltungStorage();


  function _beendeSpiel(spiel: Uno): { siegerehrungId: UniqueId } {
    const siegerehrungId: UniqueId = Date.now().toString();
    const { siegerehrungen } = siegerehrungenStorage;
    const aktualisierteSiegerehrungen = erstelleSiegerehrung(siegerehrungen, siegerehrungId, spiel);
    siegerehrungenStorage.aktualisiereSiegerehrungen(aktualisierteSiegerehrungen);

    const { spieleverwaltung } = spieleverwaltungStorage;
    const aktualisiertesSpiel = beendeSpiel(spieleverwaltung, spiel, siegerehrungId);
    spieleverwaltungStorage.aktualisiereSpieleverwaltung(aktualisiertesSpiel);

    return {
      siegerehrungId,
    };
  }

  return { beendeSpiel: _beendeSpiel };
}
