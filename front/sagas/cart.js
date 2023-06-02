import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAILURE,
  //
  CART_CREATE_REQUEST,
  CART_CREATE_SUCCESS,
  CART_CREATE_FAILURE,
  //
  CART_QUN_UPDATE_REQUEST,
  CART_QUN_UPDATE_SUCCESS,
  CART_QUN_UPDATE_FAILURE,
  //
  CART_DELETE_REQUEST,
  CART_DELETE_SUCCESS,
  CART_DELETE_FAILURE,
  //
} from "../reducers/cart";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function cartListAPI(data) {
  return await axios.post(`/api/cart/list`, data);
}

function* cartList(action) {
  try {
    const result = yield call(cartListAPI, action.data);

    yield put({
      type: CART_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CART_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function cartCreateAPI(data) {
  return await axios.post(`/api/cart/create`, data);
}

function* cartCreate(action) {
  try {
    const result = yield call(cartCreateAPI, action.data);

    yield put({
      type: CART_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CART_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function cartQunUpdateAPI(data) {
  return await axios.post(`/api/cart/qun/update`, data);
}

function* cartQunUpdate(action) {
  try {
    const result = yield call(cartQunUpdateAPI, action.data);

    yield put({
      type: CART_QUN_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CART_QUN_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function cartDeleteAPI(data) {
  return await axios.post(`/api/cart/delete`, data);
}

function* cartDelete(action) {
  try {
    const result = yield call(cartDeleteAPI, action.data);

    yield put({
      type: CART_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CART_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

//////////////////////////////////////////////////////////////
function* watchCartList() {
  yield takeLatest(CART_LIST_REQUEST, cartList);
}
function* watchCartCreate() {
  yield takeLatest(CART_CREATE_REQUEST, cartCreate);
}
function* watchCartQunUpdate() {
  yield takeLatest(CART_QUN_UPDATE_REQUEST, cartQunUpdate);
}
function* watchCartDelete() {
  yield takeLatest(CART_DELETE_REQUEST, cartDelete);
}

//////////////////////////////////////////////////////////////
export default function* cartSaga() {
  yield all([
    fork(watchCartList),
    fork(watchCartCreate),
    fork(watchCartQunUpdate),
    // fork(watchCartDelete),
    //
  ]);
}
