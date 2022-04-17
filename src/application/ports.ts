import { Siegerehrung } from "../domain/siegerehrung";
import { Spielerliste } from "../domain/spielerliste";
import { Spieleverwaltung } from "../domain/spieleverwaltung";

type StorageService<T> = T & Updater<T>;

export type SpieleverwaltungStorageService = StorageService<{ spieleverwaltung: Spieleverwaltung; }>;
export type SpielerlisteStorageService = StorageService<{ spielerliste: Spielerliste }>;
export type SiegerehrungenStorageService = StorageService<{ siegerehrungen: Siegerehrung[]; }>;
