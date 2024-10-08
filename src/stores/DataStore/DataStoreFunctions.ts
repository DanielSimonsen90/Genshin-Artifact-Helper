import { useEffect } from "react";
import type { DataStore } from './DataStoreConstants';

export function useDataStoreToWindow(store: typeof DataStore) {
  useEffect(() => {
    window.__stores.DataStore = store;
  }, [store]);
}

export function useDataStoreFunctions(store: typeof DataStore) {
  const findByName = <T extends { name: string }>(arr: T[], name: string): T | undefined => arr.find(item => item.name.toLowerCase() === name.toLowerCase());
  
  return {
    findCharacterByName: (name: string) => findByName(store.Characters, name),
    findArtifactByName: (name: string) => findByName(store.ArtifactSets, name),
  };
}