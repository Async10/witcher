
export type Spieler = string;

export type Spielerliste = Spieler[]

export function spielerHinzufuegen(liste: Spielerliste, spieler: Spieler): Result<Spielerliste> {
  if (!spieler) {
    return { success: false, error: `Der Spieler hat keinen Namen.` }
  }

  if (liste.includes(spieler)) {
    return { success: false, error: `Es gibt bereits einen Spieler mit dem Namen ${spieler}.` }
  }

  return {
    success: true,
    value: [...liste, spieler],
  }
}
