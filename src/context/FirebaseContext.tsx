import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured, getContactMessages, LOCAL_INQUIRIES_KEY, ContactMessage } from '../lib/firebase';

const ADMIN_EMAIL = 'muhammedmushfiq178@gmail.com';

interface FirebaseContextType {
  user: User | null;
  isAdmin: boolean;
  isConfigured: boolean;
  loginWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  messages: ContactMessage[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  isAdmin: false,
  isConfigured: false,
  loginWithGoogle: async () => null,
  logout: async () => {},
  messages: [],
  unreadCount: 0,
  markAsRead: async () => {},
  deleteMessage: async () => {},
  loading: false,
});

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_INQUIRIES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (auth && isFirebaseConfigured) {
      const unsub = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsub();
    } else {
      setLoading(false);
    }
  }, []);

  const isAdmin = !!(user?.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());

  useEffect(() => {
    if (isAdmin) {
      if (db && isFirebaseConfigured) {
        try {
          const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
          const unsub = onSnapshot(
            q,
            (snapshot) => {
              const msgs: ContactMessage[] = snapshot.docs.map((docSnap) => {
                const data = docSnap.data();
                return {
                  id: docSnap.id,
                  name: data.name || '',
                  email: data.email || '',
                  phone: data.phone || '',
                  location: data.location || '',
                  message: data.message || '',
                  createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
                  read: !!data.read,
                };
              });
              setMessages(msgs);
              try {
                localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(msgs));
              } catch {}
            },
            (err) => {
              console.warn('Inquiries snapshot listener error:', err);
              getContactMessages().then(setMessages);
            }
          );
          return () => unsub();
        } catch (err) {
          console.warn('Setting up inquiries listener failed:', err);
        }
      } else {
        getContactMessages().then(setMessages);
      }
    }
  }, [isAdmin]);

  const loginWithGoogle = useCallback(async () => {
    if (auth && googleProvider && isFirebaseConfigured) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        setUser(result.user);
        return result.user;
      } catch (err) {
        console.error('Google Sign-In failed:', err);
        throw err;
      }
    } else {
      // Local fallback for offline/development demo
      const mockAdmin = {
        uid: 'demo-admin-uid',
        email: ADMIN_EMAIL,
        displayName: 'Muhammed Mushfiq',
        photoURL: null,
      } as unknown as User;
      setUser(mockAdmin);
      return mockAdmin;
    }
  }, []);

  const logout = useCallback(async () => {
    if (auth && isFirebaseConfigured) {
      await signOut(auth);
    }
    setUser(null);
    try {
      sessionStorage.removeItem('mushfiq_videography_admin_session');
    } catch {}
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    if (db && isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'inquiries', id), { read: true });
      } catch {}
    }
  }, []);

  const deleteMessage = useCallback(async (id: string) => {
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      try {
        localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    if (db && isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'inquiries', id));
      } catch {}
    }
  }, []);

  const unreadCount = useMemo(() => messages.filter((m) => !m.read).length, [messages]);

  const value = useMemo(
    () => ({
      user,
      isAdmin,
      isConfigured: isFirebaseConfigured,
      loginWithGoogle,
      logout,
      messages,
      unreadCount,
      markAsRead,
      deleteMessage,
      loading,
    }),
    [user, isAdmin, loginWithGoogle, logout, messages, unreadCount, markAsRead, deleteMessage, loading]
  );

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
