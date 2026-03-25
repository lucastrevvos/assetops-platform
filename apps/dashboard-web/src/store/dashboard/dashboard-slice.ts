import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertView, AssetView } from "@assetops/shared-types";

type DashboardState = {
  assets: AssetView[];
  alerts: AlertView[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
};

const initialState: DashboardState = {
  assets: [],
  alerts: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

type DashboardSuccessPayload = {
  assets: AssetView[];
  alerts: AlertView[];
  lastUpdated: string;
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDashboardRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchDashboardSuccess(
      state,
      action: PayloadAction<DashboardSuccessPayload>,
    ) {
      state.assets = action.payload.assets;
      state.alerts = action.payload.alerts;
      state.lastUpdated = action.payload.lastUpdated;
      state.isLoading = false;
      state.error = null;
    },
    fetchDashboardFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} = dashboardSlice.actions;

export const dashboardReducer = dashboardSlice.reducer;
