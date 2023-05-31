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
  //
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  //
  GET_PRODUCT2_REQUEST,
  GET_PRODUCT2_SUCCESS,
  GET_PRODUCT2_FAILURE,
  //
  TOGGLE_PRODUCT_REQUEST,
  TOGGLE_PRODUCT_SUCCESS,
  TOGGLE_PRODUCT_FAILURE,
  //
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  //
  UPLOAD_THUMBNAIL_REQUEST,
  UPLOAD_THUMBNAIL_SUCCESS,
  UPLOAD_THUMBNAIL_FAILURE,
  //
  SAVE_THUMBNAIL_REQUEST,
  SAVE_THUMBNAIL_SUCCESS,
  SAVE_THUMBNAIL_FAILURE,
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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function getProductAPI(data) {
  return await axios.post(`/api/store/product/list`, data);
}

function* getProduct(action) {
  try {
    const result = yield call(getProductAPI, action.data);

    yield put({
      type: GET_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_PRODUCT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function getProduct2API(data) {
  return await axios.post(`/api/store/product/list2`, data);
}

function* getProduct2(action) {
  try {
    const result = yield call(getProduct2API, action.data);

    yield put({
      type: GET_PRODUCT2_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_PRODUCT2_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function toggleProductAPI(data) {
  return await axios.post(`/api/store/product/toggle`, data);
}

function* toggleProduct(action) {
  try {
    const result = yield call(toggleProductAPI, action.data);

    yield put({
      type: TOGGLE_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TOGGLE_PRODUCT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function updateProductAPI(data) {
  return await axios.post(`/api/store/product/update`, data);
}

function* updateProduct(action) {
  try {
    const result = yield call(updateProductAPI, action.data);

    yield put({
      type: UPDATE_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_PRODUCT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function uploadThumbnailAPI(data) {
  return await axios.post(`/api/store/image`, data);
}

function* uploadThumbnail(action) {
  try {
    const result = yield call(uploadThumbnailAPI, action.data);

    yield put({
      type: UPLOAD_THUMBNAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_THUMBNAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function saveThumbnailAPI(data) {
  return await axios.post(`/api/store/product/thup`, data);
}

function* saveThumbnail(action) {
  try {
    const result = yield call(saveThumbnailAPI, action.data);

    yield put({
      type: SAVE_THUMBNAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SAVE_THUMBNAIL_FAILURE,
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
function* watchGetProduct() {
  yield takeLatest(GET_PRODUCT_REQUEST, getProduct);
}
function* watchGetProduct2() {
  yield takeLatest(GET_PRODUCT2_REQUEST, getProduct2);
}
function* watchToggleProduct() {
  yield takeLatest(TOGGLE_PRODUCT_REQUEST, toggleProduct);
}
function* watchUpdateProduct() {
  yield takeLatest(UPDATE_PRODUCT_REQUEST, updateProduct);
}
function* watchUploadThumbnail() {
  yield takeLatest(UPLOAD_THUMBNAIL_REQUEST, uploadThumbnail);
}
function* watchSaveThumbnail() {
  yield takeLatest(SAVE_THUMBNAIL_REQUEST, saveThumbnail);
}

//////////////////////////////////////////////////////////////
export default function* storeSaga() {
  yield all([
    fork(watchGetProductType),
    fork(watchNewProductType),
    fork(watchModifyProductType),
    fork(watchDelProductType),
    fork(watchGet2ProductType),
    fork(watchGetProduct),
    fork(watchGetProduct2),
    fork(watchToggleProduct),
    fork(watchUpdateProduct),
    fork(watchUploadThumbnail),
    fork(watchSaveThumbnail),

    //
  ]);
}
