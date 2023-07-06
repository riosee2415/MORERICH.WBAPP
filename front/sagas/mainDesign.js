import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MAIN_DESIGN_REQUEST,
  MAIN_DESIGN_SUCCESS,
  MAIN_DESIGN_FAILURE,
  //
  BANNER_UPLOAD_REQUEST,
  BANNER_UPLOAD_SUCCESS,
  BANNER_UPLOAD_FAILURE,
  //
  MAIN_DESIGN_CREATE_REQUEST,
  MAIN_DESIGN_CREATE_SUCCESS,
  MAIN_DESIGN_CREATE_FAILURE,
  //
  MAIN_DESIGN_UPDATE_REQUEST,
  MAIN_DESIGN_UPDATE_SUCCESS,
  MAIN_DESIGN_UPDATE_FAILURE,
  //
  MAIN_DESIGN_DELETE_REQUEST,
  MAIN_DESIGN_DELETE_SUCCESS,
  MAIN_DESIGN_DELETE_FAILURE,
} from "../reducers/mainDesign";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mainDesignAPI() {
  return await axios.post(`/api/mainDesign/list`);
}

function* mainDesign() {
  try {
    const result = yield call(mainDesignAPI);

    yield put({
      type: MAIN_DESIGN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAIN_DESIGN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function bannerUploadAPI(data) {
  return await axios.post(`/api/mainDesign/image`, data);
}

function* bannerUpload(action) {
  try {
    const result = yield call(bannerUploadAPI, action.data);

    yield put({
      type: BANNER_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mainDesignCreateAPI(data) {
  return await axios.post(`/api/mainDesign/create`, data);
}

function* mainDesignCreate(action) {
  try {
    const result = yield call(mainDesignCreateAPI, action.data);

    yield put({
      type: MAIN_DESIGN_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAIN_DESIGN_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mainDesignUpdateAPI(data) {
  return await axios.post(`/api/mainDesign/update`, data);
}

function* mainDesignUpdate(action) {
  try {
    const result = yield call(mainDesignUpdateAPI, action.data);

    yield put({
      type: MAIN_DESIGN_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAIN_DESIGN_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mainDesignDeleteAPI(data) {
  return await axios.post(`/api/mainDesign/delete`, data);
}

function* mainDesignDelete(action) {
  try {
    const result = yield call(mainDesignDeleteAPI, action.data);

    yield put({
      type: MAIN_DESIGN_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAIN_DESIGN_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchMainDesign() {
  yield takeLatest(MAIN_DESIGN_REQUEST, mainDesign);
}

function* watchMainDesignCreate() {
  yield takeLatest(MAIN_DESIGN_CREATE_REQUEST, mainDesignCreate);
}

function* watchMainDesignUpdate() {
  yield takeLatest(MAIN_DESIGN_UPDATE_REQUEST, mainDesignUpdate);
}

function* watchMainDesignDelete() {
  yield takeLatest(MAIN_DESIGN_DELETE_REQUEST, mainDesignDelete);
}

// 베너 이미지만 업로드 하는 코드 (데이터베이스에는 접근하지 않습니다.)
function* watchBannerUpload() {
  yield takeLatest(BANNER_UPLOAD_REQUEST, bannerUpload);
}

//////////////////////////////////////////////////////////////
export default function* mainDesignSaga() {
  yield all([
    fork(watchMainDesign),
    fork(watchBannerUpload),
    fork(watchMainDesignCreate),
    fork(watchMainDesignUpdate),
    fork(watchMainDesignDelete),

    //
  ]);
}
