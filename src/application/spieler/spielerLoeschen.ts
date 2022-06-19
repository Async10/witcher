import { Spieler, spielerLoeschen } from "../../domain/spielerliste";
import { useSpielerlisteStorage } from "../../services/adapters";

export function useSpielerLoeschen() {
  const storage = useSpielerlisteStorage();

  function _spielerLoeschen(spieler: Spieler) {
    const { spielerliste } = storage;
    const aktualisiert = spielerLoeschen(spielerliste, spieler);
    storage.aktualisiereSpielerliste(aktualisiert);
  }

  return { spielerLoeschen: _spielerLoeschen };
}
