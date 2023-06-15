import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  //
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAILURE,
  //
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  //
  USERLIST_REQUEST,
  USERLIST_SUCCESS,
  USERLIST_FAILURE,
  //
  USERLIST_UPDATE_REQUEST,
  USERLIST_UPDATE_SUCCESS,
  USERLIST_UPDATE_FAILURE,
  //
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  //
  KAKAO_LOGIN_REQUEST,
  KAKAO_LOGIN_SUCCESS,
  KAKAO_LOGIN_FAILURE,
  //
  USER_HISTORY_REQUEST,
  USER_HISTORY_SUCCESS,
  USER_HISTORY_FAILURE,
  //
  MENURIGHT_UPDATE_REQUEST,
  MENURIGHT_UPDATE_SUCCESS,
  MENURIGHT_UPDATE_FAILURE,
  //
  ADMINUSERLIST_REQUEST,
  ADMINUSERLIST_SUCCESS,
  ADMINUSERLIST_FAILURE,
  //
  ADMINUSERRIGHT_HISTORY_REQUEST,
  ADMINUSERRIGHT_HISTORY_SUCCESS,
  ADMINUSERRIGHT_HISTORY_FAILURE,
  //
  ADMINUSER_EXITTRUE_REQUEST,
  ADMINUSER_EXITTRUE_SUCCESS,
  ADMINUSER_EXITTRUE_FAILURE,
  //
  ADMINUSER_EXITFALSE_REQUEST,
  ADMINUSER_EXITFALSE_SUCCESS,
  ADMINUSER_EXITFALSE_FAILURE,
  //
  GET_JOIN_SET_REQUEST,
  GET_JOIN_SET_SUCCESS,
  GET_JOIN_SET_FAILURE,
  //
  UP_JOIN_SET_REQUEST,
  UP_JOIN_SET_SUCCESS,
  UP_JOIN_SET_FAILURE,
  //
  USER_FIND_ID_REQUEST,
  USER_FIND_ID_SUCCESS,
  USER_FIND_ID_FAILURE,
  //
  USER_FIND_PW_REQUEST,
  USER_FIND_PW_SUCCESS,
  USER_FIND_PW_FAILURE,
  //
  CHECK_SECRET_REQUEST,
  CHECK_SECRET_SUCCESS,
  CHECK_SECRET_FAILURE,
  //
  USER_MODIFY_UPDATE_REQUEST,
  USER_MODIFY_UPDATE_SUCCESS,
  USER_MODIFY_UPDATE_FAILURE,
  //
  USER_EXIT_REQUEST,
  USER_EXIT_SUCCESS,
  USER_EXIT_FAILURE,
  //
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  //
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  //
  ADMIN_MAIN_CNT_REQUEST,
  ADMIN_MAIN_CNT_SUCCESS,
  ADMIN_MAIN_CNT_FAILURE,
} from "../reducers/user";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function loadMyInfoAPI(data) {
  return await axios.get("/api/user/signin", data);
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// *****

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function signinPI(data) {
  return await axios.post(`/api/user/signin`, data);
}

function* signin(action) {
  try {
    const result = yield call(signinPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function signinAdminPI(data) {
  return await axios.post(`/api/user/signin/admin`, data);
}

function* signinAdmin(action) {
  try {
    const result = yield call(signinAdminPI, action.data);
    yield put({
      type: LOGIN_ADMIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_ADMIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function signUpAPI(data) {
  return await axios.post(`/api/user/signup`, data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userListAPI(data) {
  return await axios.post(`/api/user/list`, data);
}

function* userList(action) {
  try {
    const result = yield call(userListAPI, action.data);
    yield put({
      type: USERLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userListUpdateAPI(data) {
  return await axios.patch(`/api/user/level/update`, data);
}

function* userListUpdate(action) {
  try {
    const result = yield call(userListUpdateAPI, action.data);
    yield put({
      type: USERLIST_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function kakaoLoginAPI() {
  return await axios.get(`/api/user/kakaoLogin`);
}

function* kakaoLogin() {
  try {
    const result = yield call(kakaoLoginAPI);

    yield put({
      type: KAKAO_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAO_LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userHistoryAPI(data) {
  return await axios.post(`/api/user/history/list`, data);
}

function* userHistory(action) {
  try {
    const result = yield call(userHistoryAPI, action.data);

    yield put({
      type: USER_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_HISTORY_FAILURE,
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
async function menuRightUpAPI(data) {
  return await axios.post(`/api/user/update/menuRight`, data);
}

function* menuRightUp(action) {
  try {
    const result = yield call(menuRightUpAPI, action.data);

    yield put({
      type: MENURIGHT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENURIGHT_UPDATE_FAILURE,
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
async function adminUserListAPI(data) {
  return await axios.post("/api/user/adminList", data);
}

function* adminUserList(action) {
  try {
    const result = yield call(adminUserListAPI, action.data);
    yield put({
      type: ADMINUSERLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSERLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminUserRightHistoryAPI(data) {
  return await axios.post(`/api/user/adminUserRight/history/list`, data);
}

function* adminUserRightHistoryList(action) {
  try {
    const result = yield call(adminUserRightHistoryAPI, action.data);

    yield put({
      type: ADMINUSERRIGHT_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSERRIGHT_HISTORY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminUserExitTrueAPI(data) {
  return await axios.post(`/api/user/exit/update/true`, data);
}

function* adminUserExitTrue(action) {
  try {
    const result = yield call(adminUserExitTrueAPI, action.data);

    yield put({
      type: ADMINUSER_EXITTRUE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSER_EXITTRUE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminUserExitFalseAPI(data) {
  return await axios.post(`/api/user/exit/update/false`, data);
}

function* adminUserExitFalse(action) {
  try {
    const result = yield call(adminUserExitFalseAPI, action.data);

    yield put({
      type: ADMINUSER_EXITFALSE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSER_EXITFALSE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function joinSetAPI(data) {
  return await axios.post(`/api/user/getJoinSet`, data);
}

function* joinSet(action) {
  try {
    const result = yield call(joinSetAPI, action.data);

    yield put({
      type: GET_JOIN_SET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_JOIN_SET_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function upJoinSetAPI(data) {
  return await axios.post(`/api/user/upJoinSet`, data);
}

function* upJoinSet(action) {
  try {
    const result = yield call(upJoinSetAPI, action.data);

    yield put({
      type: UP_JOIN_SET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UP_JOIN_SET_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userFindIdAPI(data) {
  return await axios.post(`/api/user/findId`, data);
}

function* userFindId(action) {
  try {
    const result = yield call(userFindIdAPI, action.data);

    yield put({
      type: USER_FIND_ID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_FIND_ID_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userFindPwAPI(data) {
  return await axios.post(`/api/user/modifypass`, data);
}

function* userFindPw(action) {
  try {
    const result = yield call(userFindPwAPI, action.data);

    yield put({
      type: USER_FIND_PW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_FIND_PW_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function checkSecretAPI(data) {
  return await axios.post(`/api/user/checkSecret`, data);
}

function* checkSecret(action) {
  try {
    const result = yield call(checkSecretAPI, action.data);

    yield put({
      type: CHECK_SECRET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHECK_SECRET_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function modifyUpdateAPI(data) {
  return await axios.post(`/api/user/modifypass/update`, data);
}

function* modifyUpdate(action) {
  try {
    const result = yield call(modifyUpdateAPI, action.data);

    yield put({
      type: USER_MODIFY_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_MODIFY_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userExitAPI(data) {
  return await axios.post(`/api/user/exit/update`, data);
}

function* userExit(action) {
  try {
    const result = yield call(userExitAPI, action.data);

    yield put({
      type: USER_EXIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_EXIT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userUpdateAPI(data) {
  return await axios.post(`/api/user/me/update`, data);
}

function* userUpdate(action) {
  try {
    const result = yield call(userUpdateAPI, action.data);

    yield put({
      type: USER_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_UPDATE_FAILURE,
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
async function logoutAPI(data) {
  return await axios.get(`/api/user/logout`, data);
}

function* logout(action) {
  try {
    const result = yield call(logoutAPI, action.data);
    yield put({
      type: LOGOUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGOUT_FAILURE,
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
async function adminMainAPI(data) {
  return await axios.post("/api/user/admin/main", data);
}

function* adminMain(action) {
  try {
    const result = yield call(adminMainAPI, action.data);
    yield put({
      type: ADMIN_MAIN_CNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMIN_MAIN_CNT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchSignin() {
  yield takeLatest(LOGIN_REQUEST, signin);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchSigninAdmin() {
  yield takeLatest(LOGIN_ADMIN_REQUEST, signinAdmin);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchUserList() {
  yield takeLatest(USERLIST_REQUEST, userList);
}

function* watchUserListUpdate() {
  yield takeLatest(USERLIST_UPDATE_REQUEST, userListUpdate);
}

function* watchKakaoLogin() {
  yield takeLatest(KAKAO_LOGIN_REQUEST, kakaoLogin);
}

function* watchUserHistory() {
  yield takeLatest(USER_HISTORY_REQUEST, userHistory);
}

function* watchMenuRightUp() {
  yield takeLatest(MENURIGHT_UPDATE_REQUEST, menuRightUp);
}

function* watchAdminUserList() {
  yield takeLatest(ADMINUSERLIST_REQUEST, adminUserList);
}

function* watchAdminUserRightHistoryList() {
  yield takeLatest(ADMINUSERRIGHT_HISTORY_REQUEST, adminUserRightHistoryList);
}

function* watchAdminUserExitTrue() {
  yield takeLatest(ADMINUSER_EXITTRUE_REQUEST, adminUserExitTrue);
}

function* watchAdminUserExitFalse() {
  yield takeLatest(ADMINUSER_EXITFALSE_REQUEST, adminUserExitFalse);
}

function* watchJoinSet() {
  yield takeLatest(GET_JOIN_SET_REQUEST, joinSet);
}

function* watchUpJoinSet() {
  yield takeLatest(UP_JOIN_SET_REQUEST, upJoinSet);
}

function* watchUserFindId() {
  yield takeLatest(USER_FIND_ID_REQUEST, userFindId);
}

function* watchUserFindPw() {
  yield takeLatest(USER_FIND_PW_REQUEST, userFindPw);
}

function* watchCheckSecret() {
  yield takeLatest(CHECK_SECRET_REQUEST, checkSecret);
}

function* watchUserModfiyUpdate() {
  yield takeLatest(USER_MODIFY_UPDATE_REQUEST, modifyUpdate);
}

function* watchUserUpdate() {
  yield takeLatest(USER_UPDATE_REQUEST, userUpdate);
}

function* watchUserExit() {
  yield takeLatest(USER_EXIT_REQUEST, userExit);
}

function* watchAdminMain() {
  yield takeLatest(ADMIN_MAIN_CNT_REQUEST, adminMain);
}

//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLogout),
    fork(watchSignin),
    fork(watchSigninAdmin),
    fork(watchSignUp),
    fork(watchUserList),
    fork(watchUserListUpdate),
    fork(watchKakaoLogin),
    fork(watchUserHistory),
    fork(watchMenuRightUp),
    fork(watchAdminUserList),
    fork(watchAdminUserRightHistoryList),
    fork(watchAdminUserExitTrue),
    fork(watchAdminUserExitFalse),
    fork(watchJoinSet),
    fork(watchUpJoinSet),
    fork(watchUserFindId),
    fork(watchUserFindPw),
    fork(watchCheckSecret),
    fork(watchUserModfiyUpdate),
    fork(watchUserExit),
    fork(watchUserUpdate),
    fork(watchAdminMain),
    //
  ]);
}
