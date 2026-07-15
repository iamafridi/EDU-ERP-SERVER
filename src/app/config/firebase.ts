import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import config from './index';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: config.firebase_project_id,
      clientEmail: config.firebase_client_email,
      privateKey: config.firebase_private_key?.replace(/\\n/g, '\n'),
    }),
  });
}


