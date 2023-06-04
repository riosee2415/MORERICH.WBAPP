import produce from "../util/produce";

export const initailState = {
  boughtList: [], // 구매내역
  // 구매내역 가져오기
  st_boughtListLoading: false,
  st_boughtListDone: false,
  st_boughtListError: null,
};

export const BOUGHT_LIST_REQUEST = "BOUGHT_LIST_REQUEST";
export const BOUGHT_LIST_SUCCESS = "BOUGHT_LIST_SUCCESS";
export const BOUGHT_LIST_FAILURE = "BOUGHT_LIST_FAILURE";

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
        draft.st_boughtListError = action.data;
        break;
      }

      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
