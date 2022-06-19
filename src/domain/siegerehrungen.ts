import { Spielstand } from "./spielstand";
import { Uno } from "./uno";

export type Siegerehrung = {
  id: UniqueId;
  titel: string;
  endstand: Spielstand;
  spielCreated: Timestamp;
};

export type Siegerehrungen = Record<UniqueId, Siegerehrung>;

export function erstelleSiegerehrung(
  siegerehrungen: Siegerehrungen,
  id: UniqueId,
  spiel: Uno
): Siegerehrungen {
  return {
    ...siegerehrungen,
    [id]: {
      titel: `Siegerehrung: ${spiel.titel}`,
      id,
      endstand: spiel.spielstand,
      spielCreated: spiel.created,
    },
  };
}
