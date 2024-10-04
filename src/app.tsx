import { createRoot } from 'react-dom/client';
import App from './components/App';
import * as services from '@/services';

import { CacheStore } from '@/stores/CacheStore/CacheStoreTypes';
import { DataStore } from '@/stores/DataStore/DataStore';

createRoot(document.getElementById('root')!).render(<App />);

const stores = {
  CacheStore: undefined as CacheStore,
  DataStore: DataStore.instance,
}

window.__services = services;
window.__stores = stores;

declare global {
  interface Window {
    __services: typeof services;
    __stores: typeof stores;
  }
}