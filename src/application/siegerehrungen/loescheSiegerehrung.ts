import { useSiegerehrungenStorage } from "../../services/adapters";
import { SiegerehrungenStorageService } from "../ports";

export function useLoescheSiegerehrung() {
  const storage: SiegerehrungenStorageService = useSiegerehrungenStorage();

  function loescheSiegerehrung(siegerehrungId: UniqueId) {
    const { siegerehrungen } = storage;
    delete siegerehrungen[siegerehrungId];
    const aktualisiert = { ...siegerehrungen };
    storage.aktualisiereSiegerehrungen(aktualisiert);
  }

  return { loescheSiegerehrung };
}
