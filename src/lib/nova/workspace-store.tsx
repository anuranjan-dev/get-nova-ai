import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import type { ActivityItem, ActivityKind, BrandProfile } from "./types";

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
  user: { id: string; email: string; fullName: string; firstName: string } | null;
  profile: BrandProfile;
  saveProfile: (next: BrandProfile) => Promise<void>;
  profileComplete: boolean;
  activity: ActivityItem[];
  loading: boolean;
  error: string | null;
  retry: () => void;
  logActivity: (kind: ActivityKind, title: string, detail: string) => Promise<void>;
  clearActivity: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<WorkspaceValue["user"]>(null);
  const [profile, setProfile] = useState<BrandProfile>(emptyProfile);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      const { data: auth, error: authError } = await supabase.auth.getUser();
      if (!active) return;
      if (authError || !auth.user) {
        setError("Your account could not be loaded.");
        setLoading(false);
        return;
      }
      const metadataName = typeof auth.user.user_metadata?.full_name === "string"
        ? auth.user.user_metadata.full_name
        : typeof auth.user.user_metadata?.name === "string"
          ? auth.user.user_metadata.name
          : "";
      const [profileResult, brandResult, activityResult] = await Promise.all([
        supabase.from("profiles").select("full_name,bio").eq("user_id", auth.user.id).maybeSingle(),
        supabase.from("brand_profiles").select("*").eq("user_id", auth.user.id).maybeSingle(),
        supabase.from("activity").select("id,kind,title,detail,created_at").eq("user_id", auth.user.id).order("created_at", { ascending: false }).limit(20),
      ]);
      if (!active) return;
      const loadError = profileResult.error || brandResult.error || activityResult.error;
      if (loadError) {
        setError(loadError.message);
        setLoading(false);
        return;
      }
      const fullName = profileResult.data?.full_name || metadataName;
      setUser({
        id: auth.user.id,
        email: auth.user.email ?? "",
        fullName,
        firstName: fullName.trim().split(/\s+/)[0] ?? "",
      });
      const brand = brandResult.data;
      setProfile(brand ? {
        brandName: brand.brand_name,
        personality: brand.personality,
        audience: brand.audience,
        tone: brand.tone,
        useWords: brand.use_words,
        avoidWords: brand.avoid_words,
        updatedAt: new Date(brand.updated_at).getTime(),
      } : emptyProfile);
      setActivity((activityResult.data ?? []).map((item) => ({
        id: item.id,
        kind: item.kind as ActivityKind,
        title: item.title,
        detail: item.detail,
        createdAt: new Date(item.created_at).getTime(),
      })));
      setLoading(false);
    };
    void load();
    return () => { active = false; };
  }, [reloadKey]);

  const saveProfile = useCallback(async (next: BrandProfile) => {
    if (!user) throw new Error("Your account is not ready. Try again.");
    const { data, error: saveError } = await supabase.from("brand_profiles").upsert({
      user_id: user.id,
      brand_name: next.brandName.trim(),
      personality: next.personality,
      audience: next.audience.trim(),
      tone: next.tone.trim(),
      use_words: next.useWords.trim(),
      avoid_words: next.avoidWords.trim(),
    }).select("updated_at").single();
    if (saveError) throw new Error(saveError.message);
    setProfile({ ...next, updatedAt: new Date(data.updated_at).getTime() });
  }, [user]);

  const logActivity = useCallback(async (kind: ActivityKind, title: string, detail: string) => {
    if (!user) return;
    const { data, error: logError } = await supabase.from("activity").insert({
      user_id: user.id, kind, title, detail,
    }).select("id,created_at").single();
    if (logError) throw new Error(logError.message);
    setActivity((prev) => [{ id: data.id, kind, title, detail, createdAt: new Date(data.created_at).getTime() }, ...prev].slice(0, 20));
  }, [user]);

  const clearActivity = useCallback(async () => {
    if (!user) return;
    const { error: clearError } = await supabase.from("activity").delete().eq("user_id", user.id);
    if (clearError) throw new Error(clearError.message);
    setActivity([]);
  }, [user]);

  const value = useMemo<WorkspaceValue>(
    () => ({
      user,
      profile,
      saveProfile,
      profileComplete: Boolean(profile.brandName && profile.audience && profile.tone),
      activity,
      loading,
      error,
      retry: () => setReloadKey((key) => key + 1),
      logActivity,
      clearActivity,
    }),
    [user, profile, saveProfile, activity, loading, error, logActivity, clearActivity],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside <WorkspaceProvider>");
  return ctx;
}
