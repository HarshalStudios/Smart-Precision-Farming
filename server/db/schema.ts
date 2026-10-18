import { pgTable, serial, text, timestamp, integer, boolean, numeric, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  role: text('role').notNull(), // 'Admin' | 'Farmer' | 'Partner' | 'Technician'
  email: text('email').unique().notNull(),
  active: boolean('active').default(true),
});

export const farms = pgTable('farms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  location: text('location'),
  ownerId: uuid('owner_id').references(() => users.id),
  area: numeric('area'),
  soil: text('soil'),
  fields: integer('fields'),
  crop: text('crop'),
  status: text('status'),
});

export const crops = pgTable('crops', {
  id: uuid('id').primaryKey().defaultRandom(),
  farmId: uuid('farm_id').references(() => farms.id),
  name: text('name').notNull(),
  emoji: text('emoji'),
  stage: text('stage'),
  moistureMin: integer('moisture_min'),
  moistureMax: integer('moisture_max'),
  phMin: numeric('ph_min'),
  phMax: numeric('ph_max'),
  note: text('note'),
});

export const devices = pgTable('devices', {
  id: text('id').primaryKey(),
  farmId: uuid('farm_id').references(() => farms.id),
  name: text('name').notNull(),
  kind: text('kind'),
  status: text('status'), // 'Online' | 'Offline' | 'Maintenance'
  battery: integer('battery'),
  lastSeen: timestamp('last_seen'),
  notes: text('notes'),
});

export const readings = pgTable('readings', {
  id: serial('id').primaryKey(),
  deviceId: text('device_id').references(() => devices.id),
  timestamp: timestamp('timestamp').defaultNow(),
  moisture: numeric('moisture'),
  temperature: numeric('temperature'),
  humidity: numeric('humidity'),
  ph: numeric('ph'),
});

export const alerts = pgTable('alerts', {
  id: uuid('id').primaryKey().defaultRandom(),
  farmId: uuid('farm_id').references(() => farms.id),
  title: text('title').notNull(),
  message: text('message'),
  severity: text('severity'), // 'Critical' | 'Warning' | 'Info'
  status: text('status'), // 'Active' | 'Acknowledged' | 'Resolved'
  time: timestamp('time').defaultNow(),
  action: text('action'),
});
