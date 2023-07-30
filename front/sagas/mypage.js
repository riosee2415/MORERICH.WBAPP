import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  BOUGHT_LIST_REQUEST,
  BOUGHT_LIST_SUCCESS,
  BOUGHT_LIST_FAILURE,
  //
  BOUGHT_DETAIL_REQUEST,
  BOUGHT_DETAIL_SUCCESS,
  BOUGHT_DETAIL_FAILURE,
  //
  WISH_LIST_REQUEST,
  WISH_LIST_SUCCESS,
  WISH_LIST_FAILURE,
  //
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS,
  ADDRESS_LIST_FAILURE,
  //
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_CREATE_FAILURE,
  //
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_SUCCESS,
  ADDRESS_UPDATE_FAILURE,
  //
  ADDRESS_DELETE_REQUEST,
  ADDRESS_DELETE_SUCCESS,
  ADDRESS_DELETE_FAILURE,
  //
  ADDRESS_BASIC_REQUEST,
  ADDRESS_BASIC_SUCCESS,
  ADDRESS_BASIC_FAILURE,
  //
  GET_CACEL_REQUEST,
  GET_CACEL_SUCCESS,
  GET_CACEL_FAILURE,
  //
  SET_POINT_REQUEST,
  SET_POINT_SUCCESS,
  SET_POINT_FAILURE,
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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtDetailAPI(data) {
  return await axios.post(`/api/mypage/bought/detail`, data);
}

function* boughtDetail(action) {
  try {
    const result = yield call(boughtDetailAPI, action.data);

    yield put({
      type: BOUGHT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function wishListAPI(data) {
  return await axios.post(`/api/mypage/wish/list`, data);
}

function* wishList(action) {
  try {
    const result = yield call(wishListAPI, action.data);

    yield put({
      type: WISH_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function addressListAPI(data) {
  return await axios.post(`/api/mypage/address/list`, data);
}

function* addressList(action) {
  try {
    const result = yield call(addressListAPI, action.data);

    yield put({
      type: ADDRESS_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADDRESS_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function addressCreateAPI(data) {
  return await axios.post(`/api/mypage/address/create`, data);
}

function* addressCreate(action) {
  try {
    const result = yield call(addressCreateAPI, action.data);

    yield put({
      type: ADDRESS_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADDRESS_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function addressUpdateAPI(data) {
  return await axios.post(`/api/mypage/address/update`, data);
}

function* addressUpdate(action) {
  try {
    const result = yield call(addressUpdateAPI, action.data);

    yield put({
      type: ADDRESS_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADDRESS_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function addressDeleteAPI(data) {
  return await axios.post(`/api/mypage/address/delete`, data);
}

function* addressDelete(action) {
  try {
    const result = yield call(addressDeleteAPI, action.data);

    yield put({
      type: ADDRESS_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADDRESS_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function addressBasicAPI(data) {
  return await axios.post(`/api/mypage/address/isBasicUpdate`, data);
}

function* addressBasic(action) {
  try {
    const result = yield call(addressBasicAPI, action.data);

    yield put({
      type: ADDRESS_BASIC_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADDRESS_BASIC_FAILURE,
      error: err.response.data,
    });
  }
}

//////////////////////////////////////////////////////////////

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function getCancelDataAPI(data) {
  return await axios.post(`/api/store/boughtlist/target`, data);
}

function* getCancelData(action) {
  try {
    const result = yield call(getCancelDataAPI, action.data);

    yield put({
      type: GET_CACEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_CACEL_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function setPointAPI(data) {
  return await axios.post(`/api/mypage/set/point`, data);
}

function* setPoint(action) {
  try {
    const result = yield call(setPointAPI, action.data);

    yield put({
      type: SET_POINT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SET_POINT_FAILURE,
      error: err.response.data,
    });
  }
}

//////////////////////////////////////////////////////////////
function* watchBoughtList() {
  yield takeLatest(BOUGHT_LIST_REQUEST, boughtList);
}

function* watchBoughtDetail() {
  yield takeLatest(BOUGHT_DETAIL_REQUEST, boughtDetail);
}

function* watchWishList() {
  yield takeLatest(WISH_LIST_REQUEST, wishList);
}

function* watchAddressList() {
  yield takeLatest(ADDRESS_LIST_REQUEST, addressList);
}

function* watchAddressCreate() {
  yield takeLatest(ADDRESS_CREATE_REQUEST, addressCreate);
}

function* watchAddressUpdate() {
  yield takeLatest(ADDRESS_UPDATE_REQUEST, addressUpdate);
}

function* watchAddressDelete() {
  yield takeLatest(ADDRESS_DELETE_REQUEST, addressDelete);
}

function* watchAddressBasic() {
  yield takeLatest(ADDRESS_BASIC_REQUEST, addressBasic);
}

function* watchGetCancelData() {
  yield takeLatest(GET_CACEL_REQUEST, getCancelData);
}

function* watchSetPoint() {
  yield takeLatest(SET_POINT_REQUEST, setPoint);
}

//////////////////////////////////////////////////////////////
export default function* mypageSaga() {
  yield all([
    fork(watchBoughtList),
    fork(watchBoughtDetail),
    fork(watchWishList),
    fork(watchAddressList),
    fork(watchAddressCreate),
    fork(watchAddressUpdate),
    fork(watchAddressDelete),
    fork(watchAddressBasic),
    fork(watchGetCancelData),
    fork(watchSetPoint),

    //
  ]);
}
