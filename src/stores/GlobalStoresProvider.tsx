import { PropsWithChildren } from "react";
import { GlobalStoresContext } from "./GlobalStoresConstants";

import useCacheStoreProvider from "./CacheStore/CacheStoreProvider";
import useDataStoreProvider from "./DataStore/DataStoreProvider";
import useSettingsStoreProvider from "./SettingsStore/SettingsStoreProvider";

export default function GlobalStoresProvider({ children }: PropsWithChildren) {
  const [CacheStore] = useCacheStoreProvider();
  const [DataStore] = useDataStoreProvider();
  const [SettingsStore, { SettingsNotice, NewUser }] = useSettingsStoreProvider();

  return (
    <GlobalStoresContext.Provider value={{ CacheStore, DataStore, SettingsStore }}>
      <NewUser />
      <SettingsNotice />
      {children}
    </GlobalStoresContext.Provider>
  );
}