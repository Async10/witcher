import React from "react";
import { Spieler } from "../domain/shared";
import { Siegerehrung } from "../domain/siegerehrung";
import { Spieleverwaltung } from "../domain/spieleverwaltung";
import { useLocalStorage } from "./localstorage";

const SPIELEVERWALTUNG_KEY = "witcher.spieleverwaltung";
const SIEGEREHRUNGEN_KEY = "witcher.siegerehrungen";
const SPIELER_KEY = "witcher.spieler";

type Data = {
  spieleverwaltung: Spieleverwaltung;
  siegerehrungen: Siegerehrung[];
  spieler: Spieler[];
};

export type Store = Data & Updater<Data>;

const StoreContext = React.createContext<Store | undefined>(undefined);

type StoreProviderProps = {
  children?: React.ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  const [spieleverwaltung, setSpieleverwaltung] = useLocalStorage<Spieleverwaltung>(
    SPIELEVERWALTUNG_KEY, { uno: {} });
  const [siegerehrungen, setSiegerehrungen] = useLocalStorage<Siegerehrung[]>(
    SIEGEREHRUNGEN_KEY, []);
  const [spieler, setSpieler] = useLocalStorage<Spieler[]>(SPIELER_KEY, []);
  const store: Store = {
    spieleverwaltung: spieleverwaltung,
    aktualisiereSpieleverwaltung: setSpieleverwaltung,
    siegerehrungen,
    aktualisiereSiegerehrungen: setSiegerehrungen,
    spieler,
    aktualisiereSpieler: setSpieler
  };

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const store = React.useContext(StoreContext);
  if (!store) throw new Error("useStore kann nur innerhalb eines StoreProviders verwendet werden");
  return store;
}
