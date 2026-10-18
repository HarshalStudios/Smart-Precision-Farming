import { loadData, saveData } from './dataService';
import { Farm } from '../types';

export const getFarms = async (): Promise<Farm[]> => {
  const store = loadData();
  return store.farms;
};

export const addFarm = async (farm: Farm): Promise<void> => {
  const store = loadData();
  store.farms.push(farm);
  saveData(store);
};

export const updateFarm = async (farm: Farm): Promise<void> => {
  const store = loadData();
  const index = store.farms.findIndex(f => f.id === farm.id);
  if (index !== -1) {
    store.farms[index] = farm;
    saveData(store);
  }
};

export const deleteFarm = async (id: string): Promise<void> => {
  const store = loadData();
  store.farms = store.farms.filter(f => f.id !== id);
  // Also clean up related records
  store.crops = store.crops.filter(c => c.farmId !== id);
  store.devices = store.devices.filter(d => d.farmId !== id);
  store.alerts = store.alerts.filter(a => a.farmId !== id);
  saveData(store);
};
