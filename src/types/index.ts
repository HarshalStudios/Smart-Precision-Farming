export type Role = 'Admin' | 'Farmer' | 'Partner' | 'Technician';
export type User = { id: string; name: string; role: Role; description: string; farmIds: string[]; active: boolean; initials: string };
export type Farm = { id: string; name: string; location: string; ownerId: string; area: number; soil: string; fields: number; crop: string; status: string };
export type Crop = { id: string; name: string; emoji: string; stage: string; farmId: string; moistureMin: number; moistureMax: number; phMin: number; phMax: number; note: string };
export type Device = { id: string; name: string; farmId: string; kind: string; status: 'Online' | 'Offline' | 'Maintenance'; battery: number; lastSeen: string; notes: string };
export type AlertItem = { id: string; title: string; message: string; severity: 'Critical' | 'Warning' | 'Info'; status: 'Active' | 'Acknowledged' | 'Resolved'; farmId: string; time: string; action: string };
export type Reading = { time: string; moisture: number; temperature: number; humidity: number; ph: number };
export type Page = 'Dashboard' | 'Crops' | 'Crop detail' | 'Sensor data' | 'Alerts' | 'Alert patterns' | 'Farms & lands' | 'Devices' | 'Users' | 'Profile' | 'Settings' | 'Help & support';
export type Store = {
  users: User[];
  farms: Farm[];
  crops: Crop[];
  devices: Device[];
  alerts: AlertItem[];
  thresholds: { moisture: number; temperature: number; humidity: number; phLow: number; phHigh: number };
  profile: { notifications: boolean; language: string; units: string };
};
