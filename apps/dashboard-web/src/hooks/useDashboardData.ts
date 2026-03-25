import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardRequest } from "../store/dashboard/dashboard-slice";
import type { AppDispatch, RootState } from "../store";

export function useDashboardData() {
  const dispatch = useDispatch<AppDispatch>();

  const dashboard = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardRequest());

    const interval = setInterval(() => {
      dispatch(fetchDashboardRequest());
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return {
    ...dashboard,
    refresh: async () => {
      dispatch(fetchDashboardRequest());
    },
  };
}
