import { Spielstand } from "./spielstand";
import { Uno } from "./uno";


export type Siegerehrung = {
  id: UniqueId,
  endstand: Spielstand;
};

export type Siegerehrungen = Record<UniqueId, Siegerehrung>

export function erstelleSiegerehrung(siegerehrungen: Siegerehrungen, id: UniqueId, spiel: Uno): Siegerehrungen {
  return {
    ...siegerehrungen,
    [id]: {
      id,
      endstand: spiel.spielstand,
    }
  };
}
