import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  BOUGHT_LIST_REQUEST,
  BOUGHT_LIST_SUCCESS,
  BOUGHT_LIST_FAILURE,
} from "../reducers/mypage";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtListAPI(data) {
  return await axios.post(`/api/mypage/bought/list`, data);
}

function* boughtList(action) {
  try {
    const result = yield call(boughtListAPI, action.data);

    yield put({
      type: BOUGHT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

//////////////////////////////////////////////////////////////
function* watchBoughtList() {
  yield takeLatest(BOUGHT_LIST_REQUEST, boughtList);
}

//////////////////////////////////////////////////////////////
export default function* mypageSaga() {
  yield all([
    fork(watchBoughtList),

    //
  ]);
}
