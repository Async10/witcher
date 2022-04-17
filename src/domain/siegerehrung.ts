import { Spielstand } from "./shared";
import { Uno } from "./uno";


export type Siegerehrung = {
  id: UniqueId,
  endstand: Spielstand;
};

export function erstelleSiegerehrung(spiel: Uno): Siegerehrung {

  return {
    id: Date.now().toString(),
    endstand: spiel.spielstand,
  };
}
