import { Spieler, spielerHinzufuegen } from "../../domain/spielerliste";
import { useSpielerlisteStorage } from "../../services/adapters";
import { SpielerlisteStorageService } from "../ports";

export function useSpielerHinzufuegen() {
  const storage: SpielerlisteStorageService = useSpielerlisteStorage();

  function _spielerHinzufuegen(spieler: Spieler) {
    const { spielerliste } = storage;
    const result = spielerHinzufuegen(spielerliste, spieler);
    if (result.success) {
      storage.aktualisiereSpielerliste(result.value);
    }

    return result;
  }

  return { spielerHinzufuegen: _spielerHinzufuegen };
}
