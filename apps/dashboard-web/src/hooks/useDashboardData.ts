import { useCallback, useEffect, useState } from "react";
import { AlertView, AssetView } from "@assetops/shared-types";
import { fetchJson } from "../services/api";

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

type DashboardDataState = {
  assets: AssetView[];
  alerts: AlertView[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refresh: () => Promise<void>;
};

export function useDashboardData(): DashboardDataState {
  const [assets, setAssets] = useState<AssetView[]>([]);
  const [alerts, setAlerts] = useState<AlertView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const load = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setIsLoading(true);
      setError(null);

      const [assetsResponse, alertsResponse] = await Promise.all([
        fetchJson<ApiResponse<AssetView[]>>("/assets"),
        fetchJson<ApiResponse<AlertView[]>>("/alerts"),
      ]);

      setAssets(assetsResponse.data);
      setAlerts(alertsResponse.data);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      if (isInitial) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load(true);

    const interval = setInterval(() => {
      load(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [load]);

  return {
    assets,
    alerts,
    isLoading,
    error,
    lastUpdated,
    refresh: async () => load(false),
  };
}
