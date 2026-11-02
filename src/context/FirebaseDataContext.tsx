import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { siteConfig, timelineItems, techStack } from '../config/site';
import { SiteConfig, TimelineItem, TechItem } from '../types';

const LOCAL_PROFILE_KEY = 'mushfiq_site_profile_local';
const LOCAL_TIMELINE_KEY = 'mushfiq_site_timeline_local';
const LOCAL_TECH_KEY = 'mushfiq_site_tech_local';

interface FirebaseDataContextType {
  siteProfile: SiteConfig;
  timeline: TimelineItem[];
  techStack: TechItem[];
  loading: boolean;
  refreshData: () => Promise<void>;
  updateSiteProfile: (updates: Partial<SiteConfig>) => Promise<void>;
  updateTimeline: (items: TimelineItem[]) => Promise<void>;
  updateTechStack: (items: TechItem[]) => Promise<void>;
}

const FirebaseDataContext = createContext<FirebaseDataContextType>({
  siteProfile: siteConfig,
  timeline: timelineItems,
  techStack: techStack,
  loading: false,
  refreshData: async () => {},
  updateSiteProfile: async () => {},
  updateTimeline: async () => {},
  updateTechStack: async () => {}
});

export function FirebaseDataProvider({ children }: { children: React.ReactNode }) {
  const [siteProfile, setSiteProfile] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PROFILE_KEY);
      return saved ? { ...siteConfig, ...JSON.parse(saved) } : siteConfig;
    } catch {
      return siteConfig;
    }
  });

  const [timeline, setTimeline] = useState<TimelineItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_TIMELINE_KEY);
      return saved ? JSON.parse(saved) : timelineItems;
    } catch {
      return timelineItems;
    }
  });

  const [techStackState, setTechStackState] = useState<TechItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_TECH_KEY);
      return saved ? JSON.parse(saved) : techStack;
    } catch {
      return techStack;
    }
  });

  const [loading] = useState(false);

  useEffect(() => {
    if (db && isFirebaseConfigured) {
      try {
        const unsub = onSnapshot(doc(db, 'settings', 'profile'), (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            setSiteProfile(prev => {
              const updated = { ...prev, ...data };
              try {
                localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(updated));
              } catch {}
              return updated;
            });
          }
        });
        return () => unsub();
      } catch (err) {
        console.warn('Profile snapshot listener error:', err);
      }
    }
  }, []);

  const updateSiteProfile = useCallback(async (updates: Partial<SiteConfig>) => {
    setSiteProfile(prev => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'settings', 'profile'), updates, { merge: true });
      } catch (err) {
        console.warn('Could not sync profile to Firestore:', err);
      }
    }
  }, []);

  const updateTimeline = useCallback(async (items: TimelineItem[]) => {
    setTimeline(items);
    try {
      localStorage.setItem(LOCAL_TIMELINE_KEY, JSON.stringify(items));
    } catch {}
  }, []);

  const updateTechStack = useCallback(async (items: TechItem[]) => {
    setTechStackState(items);
    try {
      localStorage.setItem(LOCAL_TECH_KEY, JSON.stringify(items));
    } catch {}
  }, []);

  const refreshData = useCallback(async () => {}, []);

  const value = useMemo(() => ({
    siteProfile,
    timeline,
    techStack: techStackState,
    loading,
    refreshData,
    updateSiteProfile,
    updateTimeline,
    updateTechStack
  }), [siteProfile, timeline, techStackState, loading, refreshData, updateSiteProfile, updateTimeline, updateTechStack]);

  return (
    <FirebaseDataContext.Provider value={value}>
      {children}
    </FirebaseDataContext.Provider>
  );
}

export function useFirebaseData() {
  return useContext(FirebaseDataContext);
}
