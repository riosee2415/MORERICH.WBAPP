import produce from "../util/produce";

export const initailState = {
  boughtList: [], // 구매내역
  boughtDetail: null, // 구매내역상세
  wishList: [], // 위시리스트
  // 구매내역 가져오기
  st_boughtListLoading: false,
  st_boughtListDone: false,
  st_boughtListError: null,
  // 구매내역상세 가져오기
  st_boughtDetailLoading: false,
  st_boughtDetailDone: false,
  st_boughtDetailError: null,
  // 위시리스트 가져오기
  st_wishListLoading: false,
  st_wishListDone: false,
  st_wishListError: null,
};

export const BOUGHT_LIST_REQUEST = "BOUGHT_LIST_REQUEST";
export const BOUGHT_LIST_SUCCESS = "BOUGHT_LIST_SUCCESS";
export const BOUGHT_LIST_FAILURE = "BOUGHT_LIST_FAILURE";

export const BOUGHT_DETAIL_REQUEST = "BOUGHT_DETAIL_REQUEST";
export const BOUGHT_DETAIL_SUCCESS = "BOUGHT_DETAIL_SUCCESS";
export const BOUGHT_DETAIL_FAILURE = "BOUGHT_DETAIL_FAILURE";

export const WISH_LIST_REQUEST = "WISH_LIST_REQUEST";
export const WISH_LIST_SUCCESS = "WISH_LIST_SUCCESS";
export const WISH_LIST_FAILURE = "WISH_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BOUGHT_LIST_REQUEST: {
        draft.st_boughtListLoading = true;
        draft.st_boughtListDone = false;
        draft.st_boughtListError = null;
        break;
      }
      case BOUGHT_LIST_SUCCESS: {
        draft.st_boughtListLoading = false;
        draft.st_boughtListDone = true;
        draft.st_boughtListError = null;
        draft.boughtList = action.data;
        break;
      }
      case BOUGHT_LIST_FAILURE: {
        draft.st_boughtListLoading = false;
        draft.st_boughtListDone = false;
        draft.st_boughtListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case BOUGHT_DETAIL_REQUEST: {
        draft.st_boughtDetailLoading = true;
        draft.st_boughtDetailDone = false;
        draft.st_boughtDetailError = null;
        break;
      }
      case BOUGHT_DETAIL_SUCCESS: {
        draft.st_boughtDetailLoading = false;
        draft.st_boughtDetailDone = true;
        draft.st_boughtDetailError = null;
        draft.boughtDetail = action.data;
        break;
      }
      case BOUGHT_DETAIL_FAILURE: {
        draft.st_boughtDetailLoading = false;
        draft.st_boughtDetailDone = false;
        draft.st_boughtDetailError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case WISH_LIST_REQUEST: {
        draft.st_wishListLoading = true;
        draft.st_wishListDone = false;
        draft.st_wishListError = null;
        break;
      }
      case WISH_LIST_SUCCESS: {
        draft.st_wishListLoading = false;
        draft.st_wishListDone = true;
        draft.st_wishListError = null;
        draft.wishList = action.data.wishList;
        break;
      }
      case WISH_LIST_FAILURE: {
        draft.st_wishListLoading = false;
        draft.st_wishListDone = false;
        draft.st_wishListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
