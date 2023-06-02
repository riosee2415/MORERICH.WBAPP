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
  //
  UPLOAD_DETAIL_REQUEST,
  UPLOAD_DETAIL_SUCCESS,
  UPLOAD_DETAIL_FAILURE,
  //
  ADD_DETAIL_REQUEST,
  ADD_DETAIL_SUCCESS,
  ADD_DETAIL_FAILURE,
  //
  DEL_DETAIL_REQUEST,
  DEL_DETAIL_SUCCESS,
  DEL_DETAIL_FAILURE,
  //
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAILURE,
  //
  DEL_PRODUCT_REQUEST,
  DEL_PRODUCT_SUCCESS,
  DEL_PRODUCT_FAILURE,
  //
  ADD_OPTION_REQUEST,
  ADD_OPTION_SUCCESS,
  ADD_OPTION_FAILURE,
  //
  DEL_OPTION_REQUEST,
  DEL_OPTION_SUCCESS,
  DEL_OPTION_FAILURE,
  //
  WISH_CHART_REQUEST,
  WISH_CHART_SUCCESS,
  WISH_CHART_FAILURE,
  //
  GET_BOUGHTLIST_REQUEST,
  GET_BOUGHTLIST_SUCCESS,
  GET_BOUGHTLIST_FAILURE,
  //
  STATUS_BOUGHTLIST_REQUEST,
  STATUS_BOUGHTLIST_SUCCESS,
  STATUS_BOUGHTLIST_FAILURE,
  //
  DELI_BOUGHTLIST_REQUEST,
  DELI_BOUGHTLIST_SUCCESS,
  DELI_BOUGHTLIST_FAILURE,
  //
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  //
  CANCEL_BOUGHT_REQUEST,
  CANCEL_BOUGHT_SUCCESS,
  CANCEL_BOUGHT_FAILURE,
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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function uploadDetailImageAPI(data) {
  return await axios.post(`/api/store/image`, data);
}

function* uploadDetailImage(action) {
  try {
    const result = yield call(uploadDetailImageAPI, action.data);

    yield put({
      type: UPLOAD_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function addDetailImageAPI(data) {
  return await axios.post(`/api/store/product/detailImage`, data);
}

function* addDetailImage(action) {
  try {
    const result = yield call(addDetailImageAPI, action.data);

    yield put({
      type: ADD_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function delDetailImageAPI(data) {
  return await axios.post(`/api/store/detail/delete`, data);
}

function* delDetailImage(action) {
  try {
    const result = yield call(delDetailImageAPI, action.data);

    yield put({
      type: DEL_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEL_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function newProductAPI(data) {
  return await axios.post(`/api/store/product/new`, data);
}

function* newProduct(action) {
  try {
    const result = yield call(newProductAPI, action.data);

    yield put({
      type: NEW_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NEW_PRODUCT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function delProductAPI(data) {
  return await axios.post(`/api/store/product/delete`, data);
}

function* delProduct(action) {
  try {
    const result = yield call(delProductAPI, action.data);

    yield put({
      type: DEL_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEL_PRODUCT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function addOptionAPI(data) {
  return await axios.post(`/api/store/option/new`, data);
}

function* addOption(action) {
  try {
    const result = yield call(addOptionAPI, action.data);

    yield put({
      type: ADD_OPTION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_OPTION_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function delOptionAPI(data) {
  return await axios.post(`/api/store/option/delete`, data);
}

function* delOption(action) {
  try {
    const result = yield call(delOptionAPI, action.data);

    yield put({
      type: DEL_OPTION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEL_OPTION_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function wishChartAPI(data) {
  return await axios.post(`/api/store/wishchart`, data);
}

function* wishChart(action) {
  try {
    const result = yield call(wishChartAPI, action.data);

    yield put({
      type: WISH_CHART_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_CHART_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtListAPI(data) {
  return await axios.post(`/api/store/boughtlist`, data);
}

function* boughtList(action) {
  try {
    const result = yield call(boughtListAPI, action.data);

    yield put({
      type: GET_BOUGHTLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_BOUGHTLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function statusBoughtListAPI(data) {
  return await axios.post(`/api/store/bought/stat/update`, data);
}

function* statusBoughtList(action) {
  try {
    const result = yield call(statusBoughtListAPI, action.data);

    yield put({
      type: STATUS_BOUGHTLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: STATUS_BOUGHTLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function deliBoughtListAPI(data) {
  return await axios.post(`/api/store/bought/stat/update2`, data);
}

function* deliBoughtList(action) {
  try {
    const result = yield call(deliBoughtListAPI, action.data);

    yield put({
      type: DELI_BOUGHTLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELI_BOUGHTLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productDetailAPI(data) {
  return await axios.post(`/api/store/product/detail`, data);
}

function* productDetail(action) {
  try {
    const result = yield call(productDetailAPI, action.data);

    yield put({
      type: PRODUCT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function cancelBoughtAPI(data) {
  return await axios.post(`/api/store/bought/cancel`, data);
}

function* cancelBought(action) {
  try {
    const result = yield call(cancelBoughtAPI, action.data);

    yield put({
      type: CANCEL_BOUGHT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CANCEL_BOUGHT_FAILURE,
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
function* watchUploadDetailImage() {
  yield takeLatest(UPLOAD_DETAIL_REQUEST, uploadDetailImage);
}
function* watchAddDetailImage() {
  yield takeLatest(ADD_DETAIL_REQUEST, addDetailImage);
}
function* watchDelDetailImage() {
  yield takeLatest(DEL_DETAIL_REQUEST, delDetailImage);
}
function* watchNewProduct() {
  yield takeLatest(NEW_PRODUCT_REQUEST, newProduct);
}
function* watchDelProduct() {
  yield takeLatest(DEL_PRODUCT_REQUEST, delProduct);
}
function* watchAddOption() {
  yield takeLatest(ADD_OPTION_REQUEST, addOption);
}
function* watchDelOption() {
  yield takeLatest(DEL_OPTION_REQUEST, delOption);
}
function* watchWishChart() {
  yield takeLatest(WISH_CHART_REQUEST, wishChart);
}
function* watchGetBoughtList() {
  yield takeLatest(GET_BOUGHTLIST_REQUEST, boughtList);
}
function* watchStatusBoughtList() {
  yield takeLatest(STATUS_BOUGHTLIST_REQUEST, statusBoughtList);
}
function* watchDeliBoughtList() {
  yield takeLatest(DELI_BOUGHTLIST_REQUEST, deliBoughtList);
}
function* watchProductDetail() {
  yield takeLatest(PRODUCT_DETAIL_REQUEST, productDetail);
}
function* watchCancelBought() {
  yield takeLatest(CANCEL_BOUGHT_REQUEST, cancelBought);
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
    fork(watchUploadDetailImage),
    fork(watchAddDetailImage),
    fork(watchDelDetailImage),
    fork(watchNewProduct),
    fork(watchDelProduct),
    fork(watchAddOption),
    fork(watchDelOption),
    fork(watchWishChart),
    fork(watchGetBoughtList),
    fork(watchStatusBoughtList),
    fork(watchDeliBoughtList),
    fork(watchProductDetail),
    fork(watchCancelBought),

    //
  ]);
}
