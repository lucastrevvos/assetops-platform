import { all, call, put, takeLatest } from "redux-saga/effects";
import { AlertView, AssetView } from "@assetops/shared-types";
import { fetchJson } from "../../services/api";
import {
  fetchDashboardFailure,
  fetchDashboardRequest,
  fetchDashboardSuccess,
} from "./dashboard-slice";

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

function* handleFetchDashboard() {
  try {
    const [assetsResponse, alertsResponse]: [
      ApiResponse<AssetView[]>,
      ApiResponse<AlertView[]>,
    ] = yield all([
      call(fetchJson<ApiResponse<AssetView[]>>, "/assets"),
      call(fetchJson<ApiResponse<AlertView[]>>, "/alerts"),
    ]);

    yield put(
      fetchDashboardSuccess({
        assets: assetsResponse.data,
        alerts: alertsResponse.data,
        lastUpdated: new Date().toISOString(),
      }),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load dashboard";

    yield put(fetchDashboardFailure(message));
  }
}

export function* dashboardSaga() {
  yield takeLatest(fetchDashboardRequest.type, handleFetchDashboard);
}
