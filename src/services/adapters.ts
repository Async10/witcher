import {
  SiegerehrungenStorageService,
  SpielerlisteStorageService,
  SpieleverwaltungStorageService
} from "../application/ports";
import { useStore } from "./store";

export function useSpieleverwaltungStorage(): SpieleverwaltungStorageService {
  return useStore();
}

export function useSpielerlisteStorage(): SpielerlisteStorageService {
  return useStore();
}

export function useSiegerehrungenStorage(): SiegerehrungenStorageService {
  return useStore();
}
