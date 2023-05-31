import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_PRODUCTTYPE_REQUEST,
  GET_PRODUCTTYPE_SUCCESS,
  GET_PRODUCTTYPE_FAILURE,
  //
  NEW_PRODUCTTYPE_REQUEST,
  NEW_PRODUCTTYPE_SUCCESS,
  NEW_PRODUCTTYPE_FAILURE,
  //
  MODIFY_PRODUCTTYPE_REQUEST,
  MODIFY_PRODUCTTYPE_SUCCESS,
  MODIFY_PRODUCTTYPE_FAILURE,
  //
  DEL_PRODUCTTYPE_REQUEST,
  DEL_PRODUCTTYPE_SUCCESS,
  DEL_PRODUCTTYPE_FAILURE,
  //
  GET2_PRODUCTTYPE_REQUEST,
  GET2_PRODUCTTYPE_SUCCESS,
  GET2_PRODUCTTYPE_FAILURE,
} from "../reducers/store";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function getProductTypeAPI(data) {
  return await axios.post(`/api/store/list`, data);
}

function* getProductType(action) {
  try {
    const result = yield call(getProductTypeAPI, action.data);

    yield put({
      type: GET_PRODUCTTYPE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_PRODUCTTYPE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function newProductTypeAPI(data) {
  return await axios.post(`/api/store/new`, data);
}

function* newProductType(action) {
  try {
    const result = yield call(newProductTypeAPI, action.data);

    yield put({
      type: NEW_PRODUCTTYPE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NEW_PRODUCTTYPE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function modifyProductTypeAPI(data) {
  return await axios.post(`/api/store/modify`, data);
}

function* modifyProductType(action) {
  try {
    const result = yield call(modifyProductTypeAPI, action.data);

    yield put({
      type: MODIFY_PRODUCTTYPE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MODIFY_PRODUCTTYPE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function delProductTypeAPI(data) {
  return await axios.post(`/api/store/delete`, data);
}

function* delProductType(action) {
  try {
    const result = yield call(delProductTypeAPI, action.data);

    yield put({
      type: DEL_PRODUCTTYPE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEL_PRODUCTTYPE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function get2ProductTypeAPI(data) {
  return await axios.post(`/api/store/list2`, data);
}

function* get2ProductType(action) {
  try {
    const result = yield call(get2ProductTypeAPI, action.data);

    yield put({
      type: GET2_PRODUCTTYPE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET2_PRODUCTTYPE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchGetProductType() {
  yield takeLatest(GET_PRODUCTTYPE_REQUEST, getProductType);
}
function* watchNewProductType() {
  yield takeLatest(NEW_PRODUCTTYPE_REQUEST, newProductType);
}
function* watchModifyProductType() {
  yield takeLatest(MODIFY_PRODUCTTYPE_REQUEST, modifyProductType);
}
function* watchDelProductType() {
  yield takeLatest(DEL_PRODUCTTYPE_REQUEST, delProductType);
}
function* watchGet2ProductType() {
  yield takeLatest(GET2_PRODUCTTYPE_REQUEST, get2ProductType);
}

//////////////////////////////////////////////////////////////
export default function* storeSaga() {
  yield all([
    fork(watchGetProductType),
    fork(watchNewProductType),
    fork(watchModifyProductType),
    fork(watchDelProductType),
    fork(watchGet2ProductType),

    //
  ]);
}
