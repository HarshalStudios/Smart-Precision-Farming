import type { Store, User, Farm, Crop, Device, AlertItem, Reading } from '../types';

const KEY = 'greenfield-demo-v1';

const seedUsers: User[] = [
  { id: 'u-admin', name: 'Sumit Singh', role: 'Admin', description: 'Platform administrator', farmIds: ['f1','f2','f3'], active: true, initials: 'SS' },
  { id: 'u-pushkar', name: 'Pushkar Kandalgaonkar', role: 'Farmer', description: 'Manage assigned farms and crops', farmIds: ['f1'], active: true, initials: 'PK' },
  { id: 'u-ramesh', name: 'Ramesh Patil', role: 'Farmer', description: 'Farmer account · Satara', farmIds: ['f2'], active: true, initials: 'RP' },
  { id: 'u-priya', name: 'Priya Deshmukh', role: 'Partner', description: 'Agricultural advisor', farmIds: ['f1','f2'], active: true, initials: 'PD' },
  { id: 'u-amit', name: 'Amit Jadhav', role: 'Technician', description: 'IoT field technician', farmIds: ['f1','f2','f3'], active: true, initials: 'AJ' }
];
const seedFarms: Farm[] = [
  { id: 'f1', name: 'Shivneri Farm', location: 'Narhe, Pune, Maharashtra', ownerId: 'u-pushkar', area: 4.5, soil: 'Black cotton soil', fields: 3, crop: 'Tomato', status: 'Healthy' },
  { id: 'f2', name: 'Sahyadri Sheti', location: 'Karad, Satara, Maharashtra', ownerId: 'u-ramesh', area: 7.2, soil: 'Red loamy soil', fields: 4, crop: 'Sugarcane', status: 'Needs attention' },
  { id: 'f3', name: 'Green Valley Plot', location: 'Baramati, Pune, Maharashtra', ownerId: 'u-admin', area: 2.8, soil: 'Alluvial soil', fields: 2, crop: 'Onion', status: 'Healthy' }
];
const seedCrops: Crop[] = [
  { id: 'c1', name: 'Tomato', emoji: '🍅', stage: 'Flowering', farmId: 'f1', moistureMin: 35, moistureMax: 65, phMin: 5.5, phMax: 7, note: 'Keep soil evenly moist; avoid prolonged waterlogging.' },
  { id: 'c2', name: 'Sugarcane', emoji: '🎋', stage: 'Vegetative', farmId: 'f2', moistureMin: 40, moistureMax: 75, phMin: 6, phMax: 7.5, note: 'Monitor soil moisture and maintain consistent irrigation.' },
  { id: 'c3', name: 'Onion', emoji: '🧅', stage: 'Bulb development', farmId: 'f3', moistureMin: 30, moistureMax: 55, phMin: 6, phMax: 7, note: 'Avoid excessive irrigation during bulb development.' },
  { id: 'c4', name: 'Soybean', emoji: '🌱', stage: 'Vegetative', farmId: 'f1', moistureMin: 35, moistureMax: 60, phMin: 6, phMax: 7, note: 'Check drainage after heavy rainfall.' },
  { id: 'c5', name: 'Cotton', emoji: '☁️', stage: 'Boll formation', farmId: 'f2', moistureMin: 30, moistureMax: 60, phMin: 5.8, phMax: 8, note: 'Inspect plants regularly and avoid overwatering.' },
  { id: 'c6', name: 'Wheat', emoji: '🌾', stage: 'Tillering', farmId: 'f3', moistureMin: 30, moistureMax: 55, phMin: 6, phMax: 7.5, note: 'Irrigation timing should reflect crop stage and local conditions.' }
];
const seedDevices: Device[] = [
  { id: 'ESP32-PN-001', name: 'Soil Sensor Node 01', farmId: 'f1', kind: 'ESP32 + soil probe', status: 'Online', battery: 92, lastSeen: '2 min ago', notes: '' },
  { id: 'ESP32-PN-002', name: 'Weather Station 01', farmId: 'f1', kind: 'Temp / humidity', status: 'Online', battery: 78, lastSeen: '4 min ago', notes: '' },
  { id: 'ESP32-ST-003', name: 'Soil Sensor Node 03', farmId: 'f2', kind: 'ESP32 + soil probe', status: 'Offline', battery: 18, lastSeen: '3 hours ago', notes: 'Check power and Wi-Fi.' },
  { id: 'ESP32-BT-004', name: 'Field Sensor Node 04', farmId: 'f3', kind: 'Multi-sensor', status: 'Maintenance', battery: 44, lastSeen: 'Yesterday', notes: 'Scheduled probe inspection.' }
];
const seedAlerts: AlertItem[] = [
  { id: 'a1', title: 'Low soil moisture', message: 'Moisture is below the configured demo range for the Tomato plot.', severity: 'Critical', status: 'Active', farmId: 'f1', time: '10 min ago', action: 'Inspect irrigation and verify the sensor reading.' },
  { id: 'a2', title: 'Device offline', message: 'Soil Sensor Node 03 has not synchronized recently.', severity: 'Warning', status: 'Active', farmId: 'f2', time: '35 min ago', action: 'Check power, network coverage and device logs.' },
  { id: 'a3', title: 'pH reading needs review', message: 'A demo pH reading is outside the configured crop range.', severity: 'Warning', status: 'Acknowledged', farmId: 'f2', time: 'Yesterday', action: 'Verify calibration and assess the soil before intervention.' },
  { id: 'a4', title: 'Sensor data received', message: 'A new sample was recorded for Shivneri Farm.', severity: 'Info', status: 'Resolved', farmId: 'f1', time: 'Yesterday', action: 'No action required.' }
];

export const freshData = (): Store => ({
  users: seedUsers,
  farms: seedFarms,
  crops: seedCrops,
  devices: seedDevices,
  alerts: seedAlerts,
  thresholds: { moisture: 30, temperature: 38, humidity: 85, phLow: 5.5, phHigh: 7.5 },
  profile: { notifications: true, language: 'English', units: 'Metric' }
});

export const loadData = (): Store => {
  try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw) as Store; } catch { /* ignore */ }
  return freshData();
};

export const saveData = (store: Store) => {
  localStorage.setItem(KEY, JSON.stringify(store));
};

export const readings: Reading[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2,'0')}:00`,
  moisture: Math.round(44 + Math.sin(i * .47) * 13 + (i % 4)),
  temperature: Math.round(27 + Math.sin(i * .32) * 5),
  humidity: Math.round(62 + Math.cos(i * .3) * 14),
  ph: Number((6.4 + Math.sin(i * .27) * .45).toFixed(1))
}));
