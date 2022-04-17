import React from "react";
import { Siegerehrung } from "../domain/siegerehrung";
import { Spielerliste } from "../domain/spielerliste";
import { Spieleverwaltung } from "../domain/spieleverwaltung";
import { useLocalStorage } from "./localstorage";

const SPIELEVERWALTUNG_KEY = "witcher.spieleverwaltung";
const SIEGEREHRUNGEN_KEY = "witcher.siegerehrungen";
const SPIELERLISTE_KEY = "witcher.spielerliste";

type Data = {
  spieleverwaltung: Spieleverwaltung;
  siegerehrungen: Siegerehrung[];
  spielerliste: Spielerliste;
};

export type Store = Data & Updater<Data>;

const StoreContext = React.createContext<Store | undefined>(undefined);

type StoreProviderProps = {
  children?: React.ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  const [spieleverwaltung, setSpieleverwaltung] =
    useLocalStorage<Spieleverwaltung>(SPIELEVERWALTUNG_KEY, { uno: {} });
  const [siegerehrungen, setSiegerehrungen] = useLocalStorage<Siegerehrung[]>(
    SIEGEREHRUNGEN_KEY,
    []
  );
  const [spielerliste, setSpielerliste] = useLocalStorage<Spielerliste>(
    SPIELERLISTE_KEY,
    []
  );
  const store: Store = {
    spieleverwaltung: spieleverwaltung,
    aktualisiereSpieleverwaltung: setSpieleverwaltung,
    siegerehrungen,
    aktualisiereSiegerehrungen: setSiegerehrungen,
    spielerliste,
    aktualisiereSpielerliste: setSpielerliste,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const store = React.useContext(StoreContext);
  if (!store)
    throw new Error(
      "useStore kann nur innerhalb eines StoreProviders verwendet werden"
    );
  return store;
}
