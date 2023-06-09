import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  NEW_BANNER_REQUEST,
  NEW_BANNER_SUCCESS,
  NEW_BANNER_FAILURE,
  //
  BANNER_UPLOAD_REQUEST,
  BANNER_UPLOAD_SUCCESS,
  BANNER_UPLOAD_FAILURE,
  //
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
  BANNER_UPDATE_FAILURE,
} from "../reducers/banner";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function newBannerAPI() {
  return await axios.post(`/api/newbanner/list`);
}

function* newBanner() {
  try {
    const result = yield call(newBannerAPI);

    yield put({
      type: NEW_BANNER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NEW_BANNER_FAILURE,
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
  return await axios.post(`/api/newbanner/image`, data);
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
async function bannerUpdateAPI(data) {
  return await axios.post(`/api/newbanner/update`, data);
}

function* bannerUpdate(action) {
  try {
    const result = yield call(bannerUpdateAPI, action.data);

    yield put({
      type: BANNER_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchNewBanner() {
  yield takeLatest(NEW_BANNER_REQUEST, newBanner);
}

function* watchBannerUpdate() {
  yield takeLatest(BANNER_UPDATE_REQUEST, bannerUpdate);
}

// 베너 이미지만 업로드 하는 코드 (데이터베이스에는 접근하지 않습니다.)
function* watchBannerUpload() {
  yield takeLatest(BANNER_UPLOAD_REQUEST, bannerUpload);
}

//////////////////////////////////////////////////////////////
export default function* bannerSaga() {
  yield all([
    fork(watchNewBanner),
    fork(watchBannerUpload),
    fork(watchBannerUpdate),

    //
  ]);
}
