import produce from "../util/produce";

export const initailState = {
  mainList: null,
  uploadBannerPath: null,

  //
  st_mainDesignLoading: false, // 배너 가져오기
  st_mainDesignDone: false,
  st_mainDesignError: null,
  //
  st_mainDesignCreateLoading: false, // 배너 생성하기
  st_mainDesignCreateDone: false,
  st_mainDesignCreateError: null,
  //
  st_bannerUploadLoading: false, // 베너 이미지 업로드
  st_bannerUploadDone: false,
  st_bannerUploadError: null,
  //
  st_mainDesignUpdateLoading: false, // 베너 수정
  st_mainDesignUpdateDone: false,
  st_mainDesignUpdateError: null,
  //
  st_mainDesignDeleteLoading: false, // 베너 삭제
  st_mainDesignDeleteDone: false,
  st_mainDesignDeleteError: null,
};

export const MAIN_DESIGN_REQUEST = "MAIN_DESIGN_REQUEST";
export const MAIN_DESIGN_SUCCESS = "MAIN_DESIGN_SUCCESS";
export const MAIN_DESIGN_FAILURE = "MAIN_DESIGN_FAILURE";

export const BANNER_UPLOAD_REQUEST = "BANNER_UPLOAD_REQUEST";
export const BANNER_UPLOAD_SUCCESS = "BANNER_UPLOAD_SUCCESS";
export const BANNER_UPLOAD_FAILURE = "BANNER_UPLOAD_FAILURE";

export const MAIN_DESIGN_CREATE_REQUEST = "MAIN_DESIGN_CREATE_REQUEST";
export const MAIN_DESIGN_CREATE_SUCCESS = "MAIN_DESIGN_CREATE_SUCCESS";
export const MAIN_DESIGN_CREATE_FAILURE = "MAIN_DESIGN_CREATE_FAILURE";

export const MAIN_DESIGN_UPDATE_REQUEST = "MAIN_DESIGN_UPDATE_REQUEST";
export const MAIN_DESIGN_UPDATE_SUCCESS = "MAIN_DESIGN_UPDATE_SUCCESS";
export const MAIN_DESIGN_UPDATE_FAILURE = "MAIN_DESIGN_UPDATE_FAILURE";

export const MAIN_DESIGN_DELETE_REQUEST = "MAIN_DESIGN_DELETE_REQUEST";
export const MAIN_DESIGN_DELETE_SUCCESS = "MAIN_DESIGN_DELETE_SUCCESS";
export const MAIN_DESIGN_DELETE_FAILURE = "MAIN_DESIGN_DELETE_FAILURE";

export const UPLOAD_BANNER_INIT_REQUEST = "UPLOAD_BANNER_INIT_REQUEST";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MAIN_DESIGN_REQUEST: {
        draft.st_mainDesignLoading = true;
        draft.st_mainDesignDone = false;
        draft.st_mainDesignError = null;
        break;
      }
      case MAIN_DESIGN_SUCCESS: {
        draft.st_mainDesignLoading = false;
        draft.st_mainDesignDone = true;
        draft.mainList = action.data;
        break;
      }
      case MAIN_DESIGN_FAILURE: {
        draft.st_mainDesignLoading = false;
        draft.st_mainDesignDone = false;
        draft.st_mainDesignError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case BANNER_UPLOAD_REQUEST: {
        draft.st_bannerUploadLoading = true;
        draft.st_bannerUploadDone = false;
        draft.st_bannerUploadError = null;
        break;
      }
      case BANNER_UPLOAD_SUCCESS: {
        draft.st_bannerUploadLoading = false;
        draft.st_bannerUploadDone = true;
        draft.st_bannerUploadError = null;
        draft.uploadBannerPath = action.data.path;
        break;
      }
      case BANNER_UPLOAD_FAILURE: {
        draft.st_bannerUploadLoading = false;
        draft.st_bannerUploadDone = false;
        draft.st_bannerUploadError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case MAIN_DESIGN_UPDATE_REQUEST: {
        draft.st_mainDesignUpdateLoading = true;
        draft.st_mainDesignUpdateDone = false;
        draft.st_mainDesignUpdateError = null;
        break;
      }
      case MAIN_DESIGN_UPDATE_SUCCESS: {
        draft.st_mainDesignUpdateLoading = false;
        draft.st_mainDesignUpdateDone = true;
        draft.st_mainDesignUpdateError = null;
        break;
      }
      case MAIN_DESIGN_UPDATE_FAILURE: {
        draft.st_mainDesignUpdateLoading = false;
        draft.st_mainDesignUpdateDone = false;
        draft.st_mainDesignUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case MAIN_DESIGN_CREATE_REQUEST: {
        draft.st_mainDesignCreateLoading = true;
        draft.st_mainDesignCreateDone = false;
        draft.st_mainDesignCreateError = null;
        break;
      }
      case MAIN_DESIGN_CREATE_SUCCESS: {
        draft.st_mainDesignCreateLoading = false;
        draft.st_mainDesignCreateDone = true;
        draft.st_mainDesignCreateError = null;
        break;
      }
      case MAIN_DESIGN_CREATE_FAILURE: {
        draft.st_mainDesignCreateLoading = false;
        draft.st_mainDesignCreateDone = false;
        draft.st_mainDesignCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case MAIN_DESIGN_DELETE_REQUEST: {
        draft.st_mainDesignDeleteLoading = true;
        draft.st_mainDesignDeleteDone = false;
        draft.st_mainDesignDeleteError = null;
        break;
      }
      case MAIN_DESIGN_DELETE_SUCCESS: {
        draft.st_mainDesignDeleteLoading = false;
        draft.st_mainDesignDeleteDone = true;
        draft.st_mainDesignDeleteError = null;
        break;
      }
      case MAIN_DESIGN_DELETE_FAILURE: {
        draft.st_mainDesignDeleteLoading = false;
        draft.st_mainDesignDeleteDone = false;
        draft.st_mainDesignDeleteError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case UPLOAD_BANNER_INIT_REQUEST: {
        draft.uploadBannerPath = null;
        break;
      }
      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
