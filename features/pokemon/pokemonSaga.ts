// import { createAction } from "@reduxjs/toolkit";
// import { SagaIterator } from "redux-saga";
// import { put, takeEvery } from "redux-saga/effects";
// import {
//   ACTIVE_APP_ACTION_TYPE,
//   DEACTIVE_APP_ACTION_TYPE,
//   INTIALISE_APP_ACTION_TYPE,
// } from "src/features/app/appActions";
// import { setAppInitialised } from "src/features/app/reducer";

// export function* initialise(): SagaIterator {
//   yield put(setAppInitialised());
// }

// function* appSaga() {
//   yield takeEvery(INTIALISE_APP_ACTION_TYPE, initialise);
// }

// export const appActivatedAction = createAction(ACTIVE_APP_ACTION_TYPE);
// export const appDeactivatedAction = createAction(DEACTIVE_APP_ACTION_TYPE);

// export default appSaga;
