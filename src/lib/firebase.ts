import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';
import * as fs from 'fs';

function getFirebaseApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Try loading service account from env path
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (serviceAccountPath) {
    const resolvedPath = path.resolve(serviceAccountPath);
    if (fs.existsSync(resolvedPath)) {
      const serviceAccount = JSON.parse(
        fs.readFileSync(resolvedPath, 'utf8')
      ) as ServiceAccount;
      return initializeApp({
        credential: cert(serviceAccount),
      });
    }
  }

  // Fallback: use FIREBASE_PROJECT_ID for environments with default credentials
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (projectId) {
    return initializeApp({ projectId });
  }

  throw new Error(
    'Firebase initialization failed: set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_PROJECT_ID in .env'
  );
}

const app = getFirebaseApp();
const db = getFirestore(app);

export { db };
