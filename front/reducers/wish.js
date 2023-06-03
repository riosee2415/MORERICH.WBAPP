import produce from "../util/produce";

export const initailState = {
  // 좋아요
  st_likeCreateLoading: false,
  st_likeCreateDone: false,
  st_likeCreateError: null,
};

export const LIKE_CREATE_REQUEST = "LIKE_CREATE_REQUEST";
export const LIKE_CREATE_SUCCESS = "LIKE_CREATE_SUCCESS";
export const LIKE_CREATE_FAILURE = "LIKE_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LIKE_CREATE_REQUEST: {
        draft.st_likeCreateLoading = true;
        draft.st_likeCreateDone = false;
        draft.st_likeCreateError = null;
        break;
      }
      case LIKE_CREATE_SUCCESS: {
        draft.st_likeCreateLoading = false;
        draft.st_likeCreateDone = true;
        draft.st_likeCreateError = null;
        break;
      }
      case LIKE_CREATE_FAILURE: {
        draft.st_likeCreateLoading = false;
        draft.st_likeCreateDone = false;
        draft.st_likeCreateError = action.data;
        break;
      }

      default:
        break;
    }
  });

export default reducer;
