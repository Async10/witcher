import { Spieler } from "../domain/shared";
import { Siegerehrung } from "../domain/siegerehrung";
import { Spieleverwaltung } from "../domain/spieleverwaltung";

type StorageService<T> = T & Updater<T>;

export type SpieleverwaltungStorageService = StorageService<{ spieleverwaltung: Spieleverwaltung; }>;
export type SpielerStorageService = StorageService<{ spieler: Spieler[]; }>;
export type SiegerehrungenStorageService = StorageService<{ siegerehrungen: Siegerehrung[]; }>;
