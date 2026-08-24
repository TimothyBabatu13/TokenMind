"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getFingerprint } from "@/lib/fingerprint";

export type UsageStatus = { unlimited: boolean; remaining: number | null };

interface UsageResult {
  fingerprint: string | null;
  usage: UsageStatus | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUsage(): UsageResult {
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [usage, setUsage] = useState<UsageStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchedRef = useRef(false);

  useEffect(() => {
    getFingerprint()
      .then(setFingerprint)
      .catch(err => {
        console.error("Fingerprint error:", err);
        setError("Failed to get fingerprint");
        setLoading(false);
      });
  }, []);

  const fetchUsage = useCallback(
    async (retry = 0) => {
      if (!fingerprint) return;

      setLoading(true);
      try {
        const res = await fetch("/api/usage", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-fingerprint": fingerprint,
          },
        });

        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

        const data = (await res.json()) as UsageStatus;
        setUsage(data);
        setLoading(false);
        setError(null);
      } catch (err: any) {
        if (retry < 1) {
          console.warn("Retrying usage fetch:", err.message);
          fetchUsage(retry + 1);
          return;
        }
        setError(err.message || "Unknown error");
        setLoading(false);
      }
    },
    [fingerprint]
  );

  useEffect(() => {
    if (!fingerprint || fetchedRef.current) return;
    fetchedRef.current = true;
    fetchUsage();
  }, [fingerprint, fetchUsage]);

  return { fingerprint, usage, loading, error, refetch: fetchUsage };
}
