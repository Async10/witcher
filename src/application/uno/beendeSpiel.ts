import { erstelleSiegerehrung, Siegerehrung } from "../../domain/siegerehrung";
import { beendeSpiel } from "../../domain/spieleverwaltung";
import { Uno } from "../../domain/uno";
import { useSiegerehrungenStorage, useSpieleverwaltungStorage } from "../../services/adapters";
import { SiegerehrungenStorageService, SpieleverwaltungStorageService } from "../ports";

export function useBeendeSpiel() {
  const siegerehrungenStorage: SiegerehrungenStorageService = useSiegerehrungenStorage();
  const spieleverwaltungStorage: SpieleverwaltungStorageService = useSpieleverwaltungStorage();


  function _beendeSpiel(spiel: Uno): Siegerehrung {
    const siegerehrung = erstelleSiegerehrung(spiel);
    const { siegerehrungen } = siegerehrungenStorage;
    siegerehrungenStorage.aktualisiereSiegerehrungen([...siegerehrungen, siegerehrung]);

    const { spieleverwaltung } = spieleverwaltungStorage;
    const aktualisiert = beendeSpiel(spieleverwaltung, spiel, siegerehrung);
    spieleverwaltungStorage.aktualisiereSpieleverwaltung(aktualisiert);

    return siegerehrung;
  }

  return { beendeSpiel: _beendeSpiel };
}
