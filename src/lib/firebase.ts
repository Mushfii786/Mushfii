import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey.length > 5
);

let app: any = null;
let auth: any = null;
let db: any = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  } catch (t) {
    console.warn('Firebase initialization error, running in offline fallback mode:', t);
  }
}

export { app, auth, db, googleProvider };

export const LOCAL_INQUIRIES_KEY = 'mushfiq_portfolio_inquiries_local';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  message: string;
  createdAt?: string;
  read?: boolean;
}

export async function saveContactMessage(message: Omit<ContactMessage, 'createdAt' | 'read' | 'id'>) {
  const localItem: ContactMessage = {
    ...message,
    createdAt: new Date().toISOString(),
    read: false,
    id: `inq-${Date.now()}`
  };

  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_INQUIRIES_KEY) || '[]');
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify([localItem, ...existing]));
  } catch {
    // ignore local storage errors
  }

  if (db && isFirebaseConfigured) {
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...message,
        createdAt: serverTimestamp(),
        read: false
      });
    } catch (s) {
      console.warn('Could not save to Firestore, saved to local cache:', s);
    }
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (db && isFirebaseConfigured) {
    try {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const docs: ContactMessage[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          message: data.message || '',
          createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
          read: !!data.read
        };
      });
      if (docs.length > 0) {
        return docs;
      }
    } catch (t) {
      console.warn('Reading remote inquiries failed, using local cache:', t);
    }
  }

  try {
    const local = localStorage.getItem(LOCAL_INQUIRIES_KEY);
    return local ? JSON.parse(local) : [];
  } catch {
    return [];
  }
}
