import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import type { ActivityItem, ActivityKind, BrandProfile } from "./types";

const PROFILE_KEY = "nova.brand-profile.v1";
const ACTIVITY_KEY = "nova.activity.v1";

export const emptyProfile: BrandProfile = {
  brandName: "",
  personality: [],
  audience: "",
  tone: "",
  useWords: "",
  avoidWords: "",
  updatedAt: null,
};

interface WorkspaceValue {
  profile: BrandProfile;
  saveProfile: (next: BrandProfile) => void;
  profileComplete: boolean;
  activity: ActivityItem[];
  logActivity: (kind: ActivityKind, title: string, detail: string) => void;
  clearActivity: () => void;
}

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<BrandProfile>(emptyProfile);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  // Read persisted state after hydration to keep SSR output stable.
  useEffect(() => {
    setProfile(read(PROFILE_KEY, emptyProfile));
    setActivity(read(ACTIVITY_KEY, [] as ActivityItem[]));
  }, []);

  const saveProfile = useCallback((next: BrandProfile) => {
    const stamped = { ...next, updatedAt: Date.now() };
    setProfile(stamped);
    try {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(stamped));
    } catch {
      /* storage unavailable — in-memory state still works */
    }
  }, []);

  const logActivity = useCallback((kind: ActivityKind, title: string, detail: string) => {
    setActivity((prev) => {
      const next = [
        { id: crypto.randomUUID(), kind, title, detail, createdAt: Date.now() },
        ...prev,
      ].slice(0, 12);
      try {
        window.localStorage.setItem(ACTIVITY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const clearActivity = useCallback(() => {
    setActivity([]);
    try {
      window.localStorage.removeItem(ACTIVITY_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<WorkspaceValue>(
    () => ({
      profile,
      saveProfile,
      profileComplete: Boolean(profile.brandName && profile.audience && profile.tone),
      activity,
      logActivity,
      clearActivity,
    }),
    [profile, saveProfile, activity, logActivity, clearActivity],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside <WorkspaceProvider>");
  return ctx;
}
