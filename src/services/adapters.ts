import {
  SiegerehrungenStorageService,
  SpielerStorageService,
  SpieleverwaltungStorageService
} from "../application/ports";
import { useStore } from "./store";

export function useSpieleverwaltungStorage(): SpieleverwaltungStorageService {
  return useStore();
}

export function useSpielerStorage(): SpielerStorageService {
  return useStore();
}

export function useSiegerehrungenStorage(): SiegerehrungenStorageService {
  return useStore();
}
