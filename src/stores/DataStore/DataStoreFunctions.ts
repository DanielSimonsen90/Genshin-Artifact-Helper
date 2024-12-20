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
    findArtifactByName: (name: string) => findByName(store.Artifacts, name),
    findDomainByName: (name: string) => findByName(store.Domains, name),

    getDomainsFromArtifact: (artifactName: string) => {
      const artifact = findByName(store.Artifacts, artifactName);
      if (!artifact) return undefined;
      
      return store.Domains.filter(domain => artifact.domainNames.includes(domain.name));
    },
    getArtifactsFromDomain: (domainName: string) => {
      const domain = findByName(store.Domains, domainName);
      if (!domain) return undefined;
      
      return store.Artifacts
        .filter(artifact => artifact.domainNames.includes(domain.name))
        .orderBy(
          (a, b) => b.rarity - a.rarity,
          (a, b) => a.name.localeCompare(b.name)
        );
    },
  };
}