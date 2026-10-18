import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let app;

try {
  const config: any = {
    projectId: process.env.FIREBASE_PROJECT_ID,
  };

  // If service account path is provided, use it
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Note: In real production, this path would be set.
    // For ADC, applicationDefault() is correct.
    config.credential = applicationDefault();
  } else {
    config.credential = applicationDefault();
  }

  app = initializeApp(config);
} catch (error) {
  console.error('Firebase Admin SDK initialization failed:', error);
  app = null;
}

export const auth = app ? getAuth(app) : null;

export const isFirebaseConfigured = !!app;
