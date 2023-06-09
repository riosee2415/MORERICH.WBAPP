import produce from "../util/produce";

export const initailState = {
  banners: null,
  uploadBannerPath: null,

  //
  st_newBannerLoading: false, // 배너 가져오기
  st_newBannerDone: false,
  st_newBannerError: null,
  //
  st_bannerUploadLoading: false, // 베너 이미지 업로드
  st_bannerUploadDone: false,
  st_bannerUploadError: null,
  //
  st_newBannerUpdateLoading: false, // 베너 수정
  st_newBannerUpdateDone: false,
  st_newBannerUpdateError: null,
};

export const NEW_BANNER_REQUEST = "NEW_BANNER_REQUEST";
export const NEW_BANNER_SUCCESS = "NEW_BANNER_SUCCESS";
export const NEW_BANNER_FAILURE = "NEW_BANNER_FAILURE";

export const BANNER_UPLOAD_REQUEST = "BANNER_UPLOAD_REQUEST";
export const BANNER_UPLOAD_SUCCESS = "BANNER_UPLOAD_SUCCESS";
export const BANNER_UPLOAD_FAILURE = "BANNER_UPLOAD_FAILURE";

export const BANNER_UPDATE_REQUEST = "BANNER_UPDATE_REQUEST";
export const BANNER_UPDATE_SUCCESS = "BANNER_UPDATE_SUCCESS";
export const BANNER_UPDATE_FAILURE = "BANNER_UPDATE_FAILURE";

export const UPLOAD_BANNER_INIT_REQUEST = "UPLOAD_BANNER_INIT_REQUEST";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case NEW_BANNER_REQUEST: {
        draft.st_newBannerLoading = true;
        draft.st_newBannerDone = false;
        draft.st_newBannerError = null;
        break;
      }
      case NEW_BANNER_SUCCESS: {
        draft.st_newBannerLoading = false;
        draft.st_newBannerDone = true;
        draft.banners = action.data;
        break;
      }
      case NEW_BANNER_FAILURE: {
        draft.st_newBannerLoading = false;
        draft.st_newBannerDone = false;
        draft.st_newBannerError = action.error;
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

      case BANNER_UPDATE_REQUEST: {
        draft.st_newBannerUpdateLoading = true;
        draft.st_newBannerUpdateDone = false;
        draft.st_newBannerUpdateError = null;
        break;
      }
      case BANNER_UPDATE_SUCCESS: {
        draft.st_newBannerUpdateLoading = false;
        draft.st_newBannerUpdateDone = true;
        draft.st_newBannerUpdateError = null;
        break;
      }
      case BANNER_UPDATE_FAILURE: {
        draft.st_newBannerUpdateLoading = false;
        draft.st_newBannerUpdateDone = false;
        draft.st_newBannerUpdateError = action.error;
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
