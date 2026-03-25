import { all } from "redux-saga/effects";
import { dashboardSaga } from "./dashboard/dashboard-saga";

export function* rootSaga() {
  yield all([dashboardSaga()]);
}
