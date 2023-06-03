import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LIKE_CREATE_REQUEST,
  LIKE_CREATE_SUCCESS,
  LIKE_CREATE_FAILURE,
} from "../reducers/wish";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function wishCreateAPI(data) {
  return await axios.post(`/api/wish/create`, data);
}

function* wishCreate(action) {
  try {
    const result = yield call(wishCreateAPI, action.data);

    yield put({
      type: LIKE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

//////////////////////////////////////////////////////////////
function* watchWishCreate() {
  yield takeLatest(LIKE_CREATE_REQUEST, wishCreate);
}

//////////////////////////////////////////////////////////////
export default function* wishSaga() {
  yield all([
    fork(watchWishCreate),

    //
  ]);
}
